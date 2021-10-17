<script>
  import { onMount } from 'svelte'
  import { drawState } from '../state'
  import SettingsPanel from './SettingsPanel.svelte'
  import {settingsStore} from '../stores/settingsStore'
  import {lifeStateStore} from '../stores/lifeStateStore'

  let canvas
  let timerId
  let height = window.innerHeight
  let width = window.innerWidth
  let unsubscribeSettingsStore = () => {}
  let unsubscribeLifeStateStore = () => {}

  $: updateRate = 1 / $settingsStore.updateRate * 1000

  const draw = (state) => {
    drawState(state, $settingsStore.cellSize, canvas)
  }

  const start = () => {
    timerId = setTimeout(function tick() {
      lifeStateStore.evolve();
      clearTimeout(timerId)
      timerId = setTimeout(tick, updateRate);
    }, updateRate)
  }

  const stop = () => {
    if (timerId) clearTimeout(timerId);
  }

  onMount(() => {
    canvas.height = height
    canvas.width = width

    $settingsStore.rows = Math.floor(canvas.height / $settingsStore.cellSize);
    $settingsStore.columns = Math.floor(canvas.width / $settingsStore.cellSize);

    lifeStateStore.generateNewPopulation()

    unsubscribeSettingsStore = settingsStore.subscribe((settings) => {
      if (settings.paused) stop()
      else start()
    })

    unsubscribeLifeStateStore = lifeStateStore.subscribe(draw)

    return () => {
      unsubscribeSettingsStore()
      unsubscribeLifeStateStore()
    }
  })
</script>

<SettingsPanel />
<canvas class="canvas" bind:this={canvas}></canvas>

<style>
  .canvas {
    background-color: #000;
  }
</style>
