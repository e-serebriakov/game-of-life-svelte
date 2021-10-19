<script>
  import Slider from './Slider.svelte'
  import { settingsStore } from '../stores/settingsStore'
  import { lifeStateStore } from '../stores/lifeStateStore'
  import ColorPicker from './ColorPicker.svelte'

  const handleSpeedChange = (value) => {
    $settingsStore.updateRate = value
  }

  const handleCellColorChange = (value) => {
    $settingsStore.liveCellColor = value
  }

  const toggleRun = () => {
    $settingsStore.paused = !$settingsStore.paused
  }

  const regenerate = () => {
    lifeStateStore.generateNewPopulation()
  }

  const clearState = () => {
    lifeStateStore.clear()
    $settingsStore.paused = true
  }
</script>

<div class="panel">
  <label for="rate" class="rate">
    <span class="rate-left-label">Slower</span>
    <Slider id="rate" onChange={handleSpeedChange} value={$settingsStore.updateRate} />
    <span class="rate-right-label">Faster</span>
  </label>

  <div class="color">
    <label for="cell-color">Cell color</label>
    <ColorPicker id="cell-color" value={$settingsStore.liveCellColor} onChange={handleCellColorChange} />
  </div>

  <button on:click={toggleRun}>
    {#if $settingsStore.paused}
      Run
    {:else}
      Pause
    {/if}
  </button>
  <button on:click={regenerate}>Regenerate</button>
  <button on:click={clearState}>Clear field</button>
</div>

<style>
  .panel {
    position: fixed;
    display: grid;
    row-gap: 12px;
    grid-template-columns: repeat(auto-fit, auto);
    top: 16px;
    right: 16px;
    padding: 16px;
    background-color: hsla(360, 1%, 1%, 0.75);
    color: #fff;
    border-radius: 4px;
  }

  .rate {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .rate-left-label {
    display: inline-block;
    margin-right: 8px;
  }

  .rate-right-label {
    display: inline-block;
    margin-left: 8px;
  }

  .color {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>