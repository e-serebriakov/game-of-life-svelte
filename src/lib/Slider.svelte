<script>
import { onMount } from "svelte";

  export let onChange = () => {};
  export let value = 1;
  let sliderInput;

  onMount(() => {
    sliderInput.oninput = function() {
      onChange(this.value)
    }
  })
</script>

<div class="container">
  <span class="left-label">
    <slot name="leftLabel"></slot>
  </span>
  <input type="range" min="1" max="100" value={value} class="slider" bind:this={sliderInput}>
  <span class="right-label">
    <slot name="rightLabel"></slot>
  </span>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .left-label {
    display: inline-block;
    margin-right: 8px;
  }

  .right-label {
    display: inline-block;
    margin-left: 8px;
  }

  .slider {
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

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
  }
</style>