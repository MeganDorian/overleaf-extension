<script>
    export let label = "",
        /** @type {String | Number} */
        value = "",
        readonly = false,
        id,
        type = "text"
</script>

<div class="block">
    <label for={id} class="has-text-weight-bold">{label}</label>
    {#if type === "text"}
        <input id={id} class="input mt-2" type="text" bind:value {readonly}>
    {:else if type === "number"}
        <input id={id} class="input mt-2" type="number" bind:value {readonly}>
    {:else if type === "email"}
        <input id={id} class="input mt-2" type="email" bind:value {readonly}>
    {:else if type === "password"}
        <input id={id} class="input mt-2" type="password" bind:value {readonly}>
    {/if}
    <span class="focus-border"></span>
</div>

<style>
    input[type="text"] {
        width: 100%;
        box-sizing: border-box;
        letter-spacing: 1px;
    }

    .input {
        border: 0;
        border-bottom: 1px solid #ccc;
        background-color: transparent;
    }

    .input ~ .focus-border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #4caf50;
        transition: 0.4s;
    }

    .input:focus ~ .focus-border {
        width: 100%;
        transition: 0.4s;
    }
</style>
