<script>
	export let options, id, title = "", value
</script>

<div class="block">
	<label for={id} class="has-text-weight-bold">{title}</label>
	<br>
	<select name={id} id={id} class="select mt-2" bind:value>
		{#each options as {key, surname}}
		  <option value={key}>{surname}</option>
		{/each}
	</select>
</div>
