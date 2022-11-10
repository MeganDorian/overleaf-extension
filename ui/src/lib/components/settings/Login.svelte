<script context="module">
  import Input from 'src/lib/components/Input.svelte'
  import Select from 'src/lib/components/Select.svelte'
</script>

<script>
  export let email = ''
  export let password = ''
  export let smtpService = ''

  let providers = [
    {
      key: 'gmail',
      name: 'Gmail',
    },
    {
      key: 'yandex',
      name: 'Yandex',
    },
  ]
</script>

<main>
  <h5 class="title is-5">Войти в аккаунт</h5>
  <div class="notification is-success is-light content">
    Для входа в аккаунт введите почту и пароль приложения почты (НЕ АККАУНТА),
    который можно получить по следующим инструкциям:
    <ul>
      <li>
        <a href="https://support.google.com/accounts/answer/185833?hl=ru"
          >Gmail</a>
      </li>
      <li>
        <a href="https://yandex.ru/support/id/authorization/app-passwords.html"
          >Яндекс</a>
      </li>
    </ul>
  </div>
  <div class="block">
    <Select
      options={providers}
      id="smtpService"
      title="Сервис почты"
      bind:value={smtpService} />
  </div>
  <Input
    id="login-email"
    label="Ваша почта (логин)"
    type="email"
    bind:value={email} />
  <Input
    id="login-email"
    label="Пароль приложения"
    type="password"
    bind:value={password} />
</main>
