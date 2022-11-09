<script>
  import { requestDoc } from './api/fetchDoc.js'
</script>

<navbar class="navbar is-flex is-justify-content-space-around mt-2">
  <button class="button" on:click={requestDoc}>Func</button>
</navbar>
