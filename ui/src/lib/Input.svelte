<script>
    export let label_name = ""
    export let input_value
    export let readonly = false
</script>

<div class="parent">
    <label for="input">{label_name}</label>
    <input id="input" class="input-effect" type="text" bind:value={input_value} {readonly}>
    <span class="focus-border"></span>
</div>

<style>
    input[type="text"] {
        font: 15px/24px 'Muli',
        sans-serif;
        color: #333;
        width: 100%;
        box-sizing: border-box;
        letter-spacing: 1px;
    }

    .input-effect {
        border: 0;
        padding: 4px 0;
        border-bottom: 1px solid #ccc;
        background-color: transparent;
    }

    .input-effect ~ .focus-border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #4caf50;
        transition: 0.4s;
    }

    .input-effect:focus ~ .focus-border {
        width: 100%;
        transition: 0.4s;
    }

    .input-effect ~ label {
        position: absolute;
        left: 0;
        width: 100%;
        top: 9px;
        color: #aaa;
        transition: 0.3s;
        z-index: -1;
        letter-spacing: 0.5px;
    }

    .input-effect:focus ~ label {
        top: -16px;
        font-size: 12px;
        color: #4caf50;
        transition: 0.3s;
    }

    .parent {
        float: left;
        margin: 40px 3%;
        position: relative;
    }
</style>
