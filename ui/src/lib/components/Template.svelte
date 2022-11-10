<script context="module">
  import { settingsStore } from 'src/lib/store/settings'
</script>

<main>
  <h5 class="title is-5">Шаблон текста письма</h5>
  <div class="notification is-success is-light content">
    Доступные плейсхолдеры:
    <ul>
      <li><code>&lbrace;num_hw&rbrace;</code> - номер домашнего задания</li>
      <li><code>&lbrace;fio&rbrace;</code> - ваше имя</li>
    </ul>
  </div>
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
