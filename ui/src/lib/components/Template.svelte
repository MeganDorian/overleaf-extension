<script context="module">
    import Input from "src/lib/components/Input.svelte"
    import { settingsStore } from 'src/lib/store/settings'
</script>

<main>
    <h5 class="title is-5">Шаблон</h5>

    <div class="block">
        <Input id="fio" label="Ваше ФИО" type="text" bind:value={$settingsStore.fio}></Input>
        <br>
        <label for="msg" class="has-text-weight-bold">Шаблон сообщения</label>
        <br>
        <textarea id="msg" bind:value={$settingsStore.msg_body}></textarea>
    </div>
</main>

<style>
    textarea {
        width: 100%;
        height: 200px;
        padding: 5px;
    }
</style>
