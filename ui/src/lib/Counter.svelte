<script>
  export let initial = 0

  let count = initial
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
