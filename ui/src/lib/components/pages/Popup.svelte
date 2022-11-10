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

  function requestDocCallback (info) {
    let {ok, fileCode, fileName} = info;
    if (!ok) {
      console.warn("Callback: not ok!");
      console.warn(info);
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
            .then(res => res.json())
            .then(json => json.code)
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
  <Button content="Послать" on:click={() => requestDoc(requestDocCallback)} class="mt-2" />
</main>
