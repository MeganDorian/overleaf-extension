<script context="module">
  import Button from "src/lib/components/Button.svelte"
  import Input from "src/lib/components/Input.svelte"
  import Select from "src/lib/components/Select.svelte"
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
  let hw_number = 1
</script>

<main class="p-3">
  <h5 class="title is-5 mt-3">Посылатор</h5>
  <navbar class="navbar is-flex is-justify-content-space-between mt-1">
    <Button content="Выйти" />
    <Button on:click={() => open('settings.html')} content="Настройки"/>
  </navbar>

  <Select options={subjects} id="subjects" title="Предмет" bind:value={selected_key} />
  <Input id="email" label="Будет послано на" value={email} readonly />
  <Input id="subject" label="С темой" value={subject} readonly />
  <Input id="subject" label="Номер дз" value={hw_number} type="number" />
  <Button content="Послать" on:click={() => alert('sent')} />
</main>
