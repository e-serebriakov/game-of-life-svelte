<script>
  export let onChange = (_value) => {}
  export let value = 1
  export let id

  const handleChange = (event) => {
    onChange(parseInt(event.target.value, 10))
  }
</script>

<input {id} type="range" min="1" max="100" {value} on:change={handleChange}>

<style>
  input {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  input:hover {
    opacity: 1;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
  }

  input::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
  }
</style>