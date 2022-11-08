<script>
    export let label_name = ""
    export let input_value
    export let readonly = false
</script>

<div class="parent">
    <label for="input">{label_name}</label>
    <input id="input" class="input" type="text" bind:value={input_value} {readonly}>
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

    .parent {
        float: left;
        margin: 40px 3%;
        position: relative;
    }
</style>
