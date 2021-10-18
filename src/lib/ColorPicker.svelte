<script>
  import { debounce } from '../utils/debounce'

  export let onChange = (_event) => {}
  export let value
  export let id

  const handleChange = debounce((event) => {
    onChange(event.target.value)
  }, 100)
</script>

<input {id} {value} type="color" on:input={handleChange} />

<style>
  input {
    width: 64px;
  }
</style>