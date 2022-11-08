<script>
    import Input from "./lib/Input.svelte";

    let email_label = "Почта"
    let subject_label = "Тема письма"
    let input_value

</script>

<main>
  <p>
    <Input label_name={email_label} bind:input_value={input_value} />
  </p>

  <p>
    <Input label_name={subject_label} bind:input_value={input_value}/>
  </p>
  
</main>

<style>

</style>
