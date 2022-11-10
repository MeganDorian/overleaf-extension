<script>
  let className = ''
  export { className as class }
  export let content = '',
    imageUrl = undefined,
    disabled = false
</script>

{#if imageUrl}
  <button class="button {className}" on:click {disabled}
    >{@html imageUrl}</button>
{:else}
  <button class="button {className}" on:click {disabled}>{content}</button>
{/if}
