<script>
  import { onMount } from 'svelte'
  import { settingsStore } from '../stores/settingsStore'
  import { lifeStateStore } from '../stores/lifeStateStore'

  let canvas
  let timerId
  const height = window.innerHeight
  const width = window.innerWidth
  let unsubscribeSettingsStore = () => {}
  let unsubscribeLifeStateStore = () => {}

  $: updateRate = 1 / $settingsStore.updateRate * 1000

  const draw = (state) => {
    const context = canvas.getContext('2d')
    const cellSize = $settingsStore.cellSize

    state.forEach((row, i) => {
      row.forEach((column, j) => {
        context.clearRect(i * cellSize, j * cellSize, cellSize, cellSize)

        if (column) {
          context.fillStyle = $settingsStore.liveCellColor
          context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
        } else {
          context.strokeStyle = $settingsStore.gridColor
          context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize)
        }
      })
    })
  }

  const startEvolution = () => {
    timerId = setTimeout(function tick() {
      lifeStateStore.evolve()
      clearTimeout(timerId)
      timerId = setTimeout(tick, updateRate)
    }, updateRate)
  }

  const stopEvolution = () => {
    if (timerId) clearTimeout(timerId)
  }

  const handleCanvasClick = (event) => {
    const x = event.x
    const y = event.y

    const rowIndex = Math.floor(y / height * $settingsStore.rows)
    const columnIndex = Math.floor(x / width * $settingsStore.columns)

    toggleCellLifeState(rowIndex, columnIndex)
  }

  const toggleCellLifeState = (rowIndex, columnIndex) => {
    if (rowIndex <= $settingsStore.rows + 1 && columnIndex <= $settingsStore.columns + 1) {
      lifeStateStore.toggleCellLifeState(rowIndex, columnIndex)
    }
  }

  onMount(() => {
    canvas.height = height
    canvas.width = width

    $settingsStore.rows = Math.floor(canvas.height / $settingsStore.cellSize)
    $settingsStore.columns = Math.floor(canvas.width / $settingsStore.cellSize)

    lifeStateStore.generateNewPopulation()

    unsubscribeSettingsStore = settingsStore.subscribe((settings) => {
      if (settings.paused) stopEvolution()
      else startEvolution()

      draw($lifeStateStore) // TODO: Is it ok to redraw on every settings change?
    })

    unsubscribeLifeStateStore = lifeStateStore.subscribe(draw)

    return () => {
      unsubscribeSettingsStore()
      unsubscribeLifeStateStore()
    }
  })
</script>

<canvas class="canvas" bind:this={canvas} on:click={handleCanvasClick}></canvas>

<style>
  .canvas {
    background-color: #000;
  }
</style>
