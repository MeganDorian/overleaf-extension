<script context="module">
  import Input from 'src/lib/components/Input.svelte'

  import { settingsStore } from 'src/lib/store/settings'
</script>

<div>
  <Input
    id="fio"
    label="Ваше ФИО"
    type="text"
    bind:value={$settingsStore.fio} />
  <br />
</div>
