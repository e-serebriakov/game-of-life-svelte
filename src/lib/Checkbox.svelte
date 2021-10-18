<script>
  export let value = false
  export let id
</script>

<input type="checkbox" {id} bind:checked={value} />