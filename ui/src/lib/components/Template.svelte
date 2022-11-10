<script>
    import Input from "src/lib/components/Input.svelte";
</script>

<main>
    <h5 class="title is-5">Шаблон</h5>

    <div class="block">
        <Input id="fio" label="Ваше ФИО" type="text"></Input>
        <br>
        <label for="msg" class="has-text-weight-bold">Шаблон сообщения</label>
        <br>
        <textarea id="msg"></textarea>
    </div>
</main>

<style>
    textarea {
        width: 100%;
        height: 200px;
        padding: 5px;
    }
</style>