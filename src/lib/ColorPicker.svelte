<script>
  export let onChange = (_value) => {}
  export let label = ''
  export let value

  const handleChange = (event) => {
    onChange(event.target.value)
  }
</script>

<div class="wrapper">
  <span>{label}</span>
  <input class="input" type="color" on:change={handleChange} {value} />
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input {
    width: 64px;
  }
</style>