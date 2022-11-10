<script>
    let className = ''
    export { className as class }
    export let content = '', imageUrl = undefined
</script>

{#if imageUrl}
    <button class="button {className}" on:click>{@html imageUrl}</button>
{:else}
    <button class="button {className}" on:click>{content}</button>
{/if}
