<script context="module">
  import Button from "src/lib/components/Button.svelte"
  import Input from "src/lib/components/Input.svelte"
  import Select from "src/lib/components/Select.svelte"

  import { requestDoc } from 'src/lib/api/fetchDoc.js'

  import { subjectsStore } from 'src/lib/store/subjects'

  import logout from "~icons/mdi/logout?raw"
  import settings from "~icons/mdi/cog?raw"
</script>

<script>
  $: subjects = $subjectsStore?.subjects

  let selected_key = ''
  $: selected_subject = subjects?.find(e => e.key === selected_key)
  $: email = selected_subject?.email
  $: subject = selected_subject?.subject
  let hw_number = 1

  function requestDocCallback (id) {
    // TODO: send json with provided id
    console.log('requestDocCallback with id', id)
  }
</script>

<main class="p-3">
  <h5 class="title is-5 mt-3">Посылатор</h5>
  <navbar class="navbar is-flex is-justify-content-space-between mt-1">
    <Button imageUrl={logout}/>
    <Button imageUrl={settings} on:click={() => open('settings.html')}/>
  </navbar>

  <Select options={subjects || []} id="subjects" title="Предмет" bind:value={selected_key} />
  <Input id="email" label="Будет послано на" value={email} readonly />
  <Input id="topic" label="С темой" value={subject} readonly />
  <Input id="subject" label="Номер дз" value={hw_number} type="number" />
  <Button content="Послать" on:click={() => requestDoc(requestDocCallback)} class="mt-2" />
</main>
