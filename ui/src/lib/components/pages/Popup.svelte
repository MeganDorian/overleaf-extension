<script context="module">
    import Button from "src/lib/components/Button.svelte"
    import Input from "src/lib/components/Input.svelte"
    import Select from "src/lib/components/Select.svelte"

  import { requestDoc } from 'src/lib/api/fetchDoc.js'
  // import { subjectsStore } from 'src/lib/store/subjects.js'
  import { c_all_data } from "src/templates"
  import logout from "~icons/mdi/logout?raw"
  import settings from "~icons/mdi/cog?raw"
</script>

<script>
  let subjects = [];
  for (let i = 0; i < c_all_data.subjects.length; i++) {
    for (let j = 0; j < c_all_data.subjects[i].msg_view.length; j++)
    subjects.push(c_all_data.subjects[i].msg_view[j])
  }
  console.log(subjects)
  // let subjects = [
  //   {
  //     key: 'algo-krav',
  //     name: 'Алгоритмы Кравченко',
  //     email: 'krav@test.com',
  //     subject: '[ИТМО] ДЗ 5 Фамилия Имя'
  //   }
  // ]
  let selected_key = ''
  let hw_number = 1
  $: selected_subject = subjects.find(e => e.key === selected_key)
  $: email = selected_subject?.email  
  $: topic = selected_subject?.topic.replace('{num_hw}', hw_number)//format(topic, {num_hw: hw_number.toString})

    function requestDocCallback(i) {
        console.log(`Called back! ${i}`);

        let content = JSON.stringify(
            {
                "username": "mishakollins68@gmail.com",
                "password": "",
                "toAddress": "julie.meh@yandex.ru",
                "text": "Отправляю домашнюю работу",
                "subject": "Домашняя работа по алогсам",
                "code": i,
                "fileName": "Algos.pdf"
            }
        );

        return fetch(
            "http://localhost:19022/send",
            {
                method: "POST",
                body: content
            }
        )
            .then(res => res.json())
            .then(json => json.code)
            .catch(console.error)
    }
</script>

<main class="p-3">
    <h5 class="title is-5 mt-3">Посылатор</h5>
    <navbar class="navbar is-flex is-justify-content-space-between mt-1">
        <Button imageUrl={logout}/>
        <Button imageUrl={settings} on:click={() => open('settings.html')}/>
    </navbar>

  <Select options={subjects} id="subjects" title="Предмет" bind:value={selected_key} />
  
  <Input id="email" label="Будет послано на" value={email} readonly />
  <Input id="subject" label="С темой" value={topic} readonly />
  <Input id="subject" label="Номер дз" value={hw_number} type="number" />
  <Button content="Послать" on:click={() => alert('sent')} />
</main>
