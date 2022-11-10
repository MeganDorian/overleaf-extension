<script context="module">
  import Button from "src/lib/components/Button.svelte"
  import Input from "src/lib/components/Input.svelte"
  import SelectSubjects from "src/lib/components/SelectSubjects.svelte"

  import { requestDoc } from 'src/lib/api/fetchDoc.js'

  import { subjectsStore } from 'src/lib/store/subjects'

  import settings from "~icons/mdi/cog?raw"
</script>

<script>
  $: subjects = $subjectsStore?.subjects

  let selected_subject_key = ''
  let selected_msg_view_surname = ''

  $: selected_subject = subjects?.find(e => e.key === selected_subject_key)
  $: selected_view = selected_subject?.msg_view.find(v => v.surname === selected_msg_view_surname)

  $: email = selected_view?.email
  $: hw_number = selected_subject?.num_hw
  $: subject = selected_view?.topic
  $: subject_replaced = subject?.replace("{num_hw}", hw_number)
  let is_loading = false
  let is_error = false
  let show_message = ''
  
  function start_loading() {
    is_loading = true
    is_error = false
    show_message = ''
    requestDoc(requestDocCallback)
  }
  function end_loading_file() {
    is_loading = false
    is_error = true
    show_message = 'Расширению не удалось получить pdf файл | Ошибка нативного сервера'
  }

  function end_loading_server(response) {
    is_loading = false
    if (response.ok) {
        show_message = 'Письмо отправлено'
        console.log('Отправлено')
    } else {
        is_error = true
        show_message = 'error'
        console.log('Сервер не отвечает')
    }
  }
  function requestDocCallback (info) {
    
    let {ok, fileCode, fileName} = info;
    if (!ok) {
      console.warn("Callback: not ok!");
      console.warn(info);
      end_loading_file()
      return;
    }
    console.log('requestDocCallback with id', fileCode)

        let content = JSON.stringify(
            {
                "username": "mishakollins68@gmail.com",
                "password": "",
                "toAddress": "julie.meh@yandex.ru",
                "text": "Отправляю домашнюю работу",
                "subject": subject_replaced,
                "code": fileCode,
                "fileName": "HW"+hw_number+".pdf",
                "smtpService": "gmail",
            }
        );

        return fetch(
            "http://localhost:19022/send",
            {
                method: "POST",
                body: content
            }
        )
            .then(end_loading_server)
            .catch(console.error)
  }
</script>

<main class="p-3">
  <navbar class="navbar is-flex is-justify-content-space-between mt-1">
    <h5 class="title is-5 mt-3">Посылатор</h5>
    <Button imageUrl={settings} on:click={() => open('settings.html')}/>
  </navbar>

  <SelectSubjects subjects={subjects || []} bind:key={selected_subject_key} bind:surname={selected_msg_view_surname} />
  <Input id="email" label="Будет послано на" value={email} readonly />
  <Input id="topic" label="С темой" value={subject_replaced} readonly />
  <Input id="subject" label="Номер дз" bind:value={hw_number} type="number" />
  <Button content="Послать" on:click={() => start_loading()} class="mt-2 {is_loading ? "is-link is-loading" : "" }" />
  <p class="has-text-{is_error ? "danger" : "success"}"> {show_message} </p>
  </main>