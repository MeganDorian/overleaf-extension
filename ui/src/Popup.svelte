<script>
    import Counter from "./lib/Counter.svelte";

    let initial = 5

    let h = '<h2>sample @html</h2>'
</script>

<main>
  <button on:click={() => open('settings.html')}>Open settings</button>

  <p>
    <Counter {initial} />
  </p>
  <Counter />

  <p>{@html h}</p>
</main>

<style>
  p > :global(button) {
    color: red;
  }
</style>
