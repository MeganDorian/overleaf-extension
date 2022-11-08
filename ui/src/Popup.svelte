<script>
  import Input from "./lib/Input.svelte"
</script>

<main>
  <div>
    <button class="button">Log out</button>
    <h3 class="title is-3">Посылатор</h3>
    <button class="button" on:click={() => open('settings.html')}>Settings</button>
  </div>

  <Input input_value="" label_name="asdf" />
</main>
