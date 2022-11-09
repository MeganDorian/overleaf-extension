<script context="module">
	import Button from './Button.svelte'
	import Input from './Input.svelte'
</script>

<script>
	let email = ''
	let password = ''
</script>

<content>
	<h5 class="title is-5">Войти в аккаунт</h5>
	<div class="notification is-info content">
		Для входа в аккаунт введите почту и пароль приложения почты (НЕ АККАУНТА), который можно получить по следующим инструкциям:
		<ul>
			<li><a href="https://support.google.com/accounts/answer/185833?hl=ru">Gmail</a></li>
			<li><a href="https://yandex.ru/support/id/authorization/app-passwords.html">Яндекс</a></li>
		</ul>
	</div>
	<Input id="login-email" label="Почта" type="email" bind:value={email} />
	<Input id="login-email" label="Пароль приложения" type="password" bind:value={password} />
	<Button content="Послать" on:click={() => alert(`Почта: ${email}, пароль: ${password}`)} />
</content>
