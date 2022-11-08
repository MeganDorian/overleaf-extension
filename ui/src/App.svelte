<script>
  import svelteLogo from './assets/svelte.svg'
  let emailInput = '';
  let themeInput = '';
</script>

<main>
  <h1>Посылатор</h1>

  <div>
      <input bind:value={emailInput} placeholder="Anely it's for you">
  </div>

  <div>
    <input bind:value={themeInput} placeholder="Anely it's for you too" readonly></div>
</main>

<style>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>
