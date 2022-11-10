<script context="module">
	import Select from "src/lib/components/Select.svelte"
</script>

<script>
	export let subjects, key, surname

	let selected = ''
	$: selected_keys = selected?.split(':') || ['', '']
	$: options = subjects.map((s) =>
		s.msg_view.map((v) => ({
			key: s.key + ':' + v.surname,
			name: v.surname,
		}))
	).flat()
	$: key = selected_keys[0]
	$: surname = selected_keys[1]
</script>

<Select options={options} id="subjects" title="Предмет" bind:value={selected} />
