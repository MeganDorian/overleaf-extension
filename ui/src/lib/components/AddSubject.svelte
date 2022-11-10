<script>
    import Input from "src/lib/components/Input.svelte";
</script>

<menu>
    <div class="block">
        <Input id="subject_name" label="Название предмета" type="text"></Input>
        <br>
        <Input id="teacher_name" label="Имя преподавателя" type="text"></Input>
        <br>
        <Input id="teacher_email" label="Почта преподавателя" type="email"></Input>
        <br>
        <Input id="topic" label="Тема письма" type="text"></Input>
        <br>
    </div>
</menu>