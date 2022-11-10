<script context="module">
  import format from 'string-template'

  import Button from 'src/lib/components/Button.svelte'
  import Input from 'src/lib/components/Input.svelte'
  import SelectSubjects from 'src/lib/components/SelectSubjects.svelte'

  import { requestDoc } from 'src/lib/api/fetchDoc'

  import { subjectsStore } from 'src/lib/store/subjects'
  import { settingsStore } from 'src/lib/store/settings'

  import settings from '~icons/mdi/cog?raw'
</script>

<script>
  $: subjects = $subjectsStore?.subjects

  let selected_subject_key = ''
  let selected_msg_view_surname = ''

  $: selected_subject = subjects?.find((e) => e.key === selected_subject_key)
  $: selected_view = selected_subject?.msg_view.find(
    (v) => v.surname === selected_msg_view_surname
  )

  $: email = selected_view?.email
  $: topic = selected_view?.topic
  $: body = $settingsStore.msg_body
  $: substition_dict = {
    num_hw: $settingsStore.num_hw,
    fio: $settingsStore.fio,
  }
  $: topic_replaced = format(topic || '', substition_dict)
  $: body_replaced = format(body || '', substition_dict)

  let is_loading = false
  let is_error = false
  let show_message = ''

  let is_overleaf = true
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const ADDRESS_REGEX = /https:\/\/.*\.overleaf.com\/project\/.*/
    let url = tabs[0].url
    is_overleaf = ADDRESS_REGEX.test(url)
  })

  function start_loading() {
    is_loading = true
    is_error = false
    show_message = ''
    requestDoc(requestDocCallback)
  }
  function end_loading_file() {
    is_loading = false
    is_error = true
    show_message =
      'Расширению не удалось получить pdf файл | Ошибка нативного сервера'
  }

  function end_loading_server(response) {
    is_loading = false
    if (response.ok) {
      show_message = 'Письмо отправлено'
      console.log('Отправлено')
    } else {
      is_error = true
      console.log('Сервер не отвечает')
      response.text().then((text) => {
        show_message = text
      })
    }
  }
  function requestDocCallback(info) {
    let { ok, fileCode, fileName } = info
    if (!ok) {
      console.warn('Callback: not ok!')
      console.warn(info)
      end_loading_file()
      return
    }
    console.log('requestDocCallback with id', fileCode)

    let content = JSON.stringify({
      username: $settingsStore.user_email,
      password: $settingsStore.password,
      toAddress: email,
      text: body_replaced,
      subject: topic_replaced,
      code: fileCode,
      fileName: 'HW' + $settingsStore.num_hw + '.pdf',
      smtpService: $settingsStore.smtpService,
    })

    return fetch('http://localhost:19022/send', {
      method: 'POST',
      body: content,
    })
      .then(end_loading_server)
      .catch(console.error)
  }
</script>

<main class="p-3">
  <navbar class="navbar is-flex is-justify-content-space-between mt-1">
    <h5 class="title is-5 mt-3">Посылатор</h5>
    <Button imageUrl={settings} on:click={() => open('settings.html')} />
  </navbar>

  {#if !is_overleaf}
    <div class="notification is-warning">
      Чтобы использовать расширение откройте проект Overleaf и выберите файл,
      который хотите отправить
    </div>
  {:else}
    <SelectSubjects
      subjects={subjects || []}
      bind:key={selected_subject_key}
      bind:surname={selected_msg_view_surname} />
    <Input id="email" label="Будет послано на" value={email} readonly />
    <Input id="topic" label="С темой" value={topic_replaced} readonly />
    <Input
      id="subject"
      label="Номер дз"
      bind:value={$settingsStore.num_hw}
      type="number" />
    <Button
      content="Послать"
      on:click={() => start_loading()}
      class="mt-2 {is_loading ? 'is-link is-loading' : ''}" />
    <p class="has-text-{is_error ? 'danger' : 'success'}">{show_message}</p>
  {/if}
</main>
