<script context="module">
  import Input from 'src/lib/components/Input.svelte'
  import Button from 'src/lib/components/Button.svelte'

  import { subjectsStore } from 'src/lib/store/subjects'
</script>

<script>
  let subject_name = '',
    teacher_name = '',
    teacher_email = '',
    topic = ''

  $: add_button_disabled =
    subject_name === '' ||
    teacher_name === '' ||
    teacher_email === '' ||
    topic === ''

  function add_subject() {
    let msg_view = {
      surname: teacher_name,
      email: teacher_email,
      topic,
    }
    subjectsStore.add_subject(subject_name, msg_view)

    subject_name = ''
    teacher_name = ''
    teacher_email = ''
    topic = ''
  }
</script>

<menu>
  <div class="block">
    <Input
      id="subject_name"
      label="Название предмета"
      type="text"
      bind:value={subject_name} />
    <br />
    <Input
      id="teacher_name"
      label="Имя преподавателя"
      type="text"
      bind:value={teacher_name} />
    <br />
    <Input
      id="teacher_email"
      label="Почта преподавателя"
      type="email"
      bind:value={teacher_email} />
    <br />
    <Input id="topic" label="Тема письма" type="text" bind:value={topic} />
    <br />
    <Button
      content="Добавить"
      on:click={add_subject}
      disabled={add_button_disabled}
      class="mt-2" />
  </div>
</menu>
