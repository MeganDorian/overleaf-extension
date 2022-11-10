<script context="module">
  import Placeholders from './Placeholders.svelte'

  import { settingsStore } from 'src/lib/store/settings'
</script>

<main>
  <h5 class="title is-5">Шаблон текста письма</h5>
  <Placeholders />
  <div class="block">
    <textarea id="msg" class="textarea" bind:value={$settingsStore.msg_body} />
  </div>
</main>

<style>
  textarea {
    width: 100%;
    height: 200px;
    padding: 5px;
  }
</style>
