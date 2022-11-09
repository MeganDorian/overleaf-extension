<script context="module">
  import Input from "./lib/Input.svelte"
  import Select from "./lib/Select.svelte"
</script>

<script>
  let subjects = [
    {
      key: 'algo-krav',
      name: 'Алгоритмы Кравченко',
      email: 'krav@test.com',
      subject: '[ИТМО] ДЗ 5 Фамилия Имя'
    }
  ]
  let selected_key = ''
  $: selected_subject = subjects.find(e => e.key === selected_key)
  $: email = selected_subject?.email
  $: subject = selected_subject?.subject
</script>

<main class="p-3">
  <h6 class="title is-5 mt-3">Посылатор</h6>
  <navbar class="navbar is-flex is-justify-content-space-between mt-1">
    <button class="button">Log out</button>
    <button class="button" on:click={() => open('settings.html')}>Settings</button>
  </navbar>
  <Select options={subjects} id="subjects" title="Предмет" bind:value={selected_key} />
  <Input id="email" label="Будет послано на" value={email} readonly />
  <Input id="subject" label="С темой" value={subject} readonly />
</main>
