<script>
    export let label = "",
        value = "",
        readonly = false,
        id
</script>

<div class="block">
    <label for={id} class="has-text-weight-bold">{label}</label>
    <input id={id} class="input mt-2" type="text" bind:value {readonly}>
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
        padding: 4px 0;
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
