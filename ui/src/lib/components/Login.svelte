<script context="module">
	import Input from 'src/lib/components/Input.svelte'
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
	<div class="block">
		<label for="smtpService" class="has-text-weight-bold">Сервис</label>
		<br>
		<select name="smtpService" id="smtpService" >
			<option value="gmail">Gmail</option>
			<option value="yandex">Yandex</option>
		</select>
	</div>
	<Input id="login-email" label="Ваша почта (логин)" type="email" bind:value={email} />
	<Input id="login-email" label="Пароль приложения" type="password" bind:value={password} />

	
</content>
