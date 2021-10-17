<script>
  import Slider from './Slider.svelte'
  import {settingsStore} from '../stores/settingsStore';
  import { lifeStateStore } from '../stores/lifeStateStore';
  import ColorPicker from './ColorPicker.svelte';

  const handleSpeedChange = (value) => {
    $settingsStore.updateRate = value
  }

  const handleCellColorChange = (value) => {
    $settingsStore.liveCellColor = value
  }

  const handleGridColorChange = (value) => {
    $settingsStore.gridColor = value
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
  <Slider onChange={handleSpeedChange} value={$settingsStore.updateRate}>
    <span slot="leftLabel">Slower</span>
    <span slot="rightLabel">Faster</span>
  </Slider>

  <ColorPicker label="Cell color" value={$settingsStore.liveCellColor} onChange={handleCellColorChange} />

  <ColorPicker label="Grid color" value={$settingsStore.gridColor} onChange={handleGridColorChange} />

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
</style>