<script>
    export let content = '', imageUrl = undefined
</script>

{#if imageUrl}
    <button class="button" on:click>{@html imageUrl}</button>
{:else}
    <button class="button" on:click>{content}</button>
{/if}
