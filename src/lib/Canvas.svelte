<script>
  import { onMount } from 'svelte'
  import { settingsStore } from '../stores/settingsStore'
  import { lifeStateStore } from '../stores/lifeStateStore'

  const height = window.innerHeight
  const width = window.innerWidth
  let lifeCanvas
  let timerId
  let mouseClicked = false
  let unsubscribeSettingsStore = () => {}
  let unsubscribeLifeStateStore = () => {}

  $: updateRate = (1 / $settingsStore.updateRate) * 1000

  const drawLife = (state) => {
    const context = lifeCanvas.getContext('2d')
    const cellSize = $settingsStore.cellSize

    context.fillStyle = $settingsStore.liveCellColor

    state.currentState.forEach((row, i) => {
      row.forEach((column, j) => {
        if (column) {
          context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
        } else {
          context.clearRect(i * cellSize, j * cellSize, cellSize, cellSize)
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

  const getRowAndColumnFromCoords = (x, y) => {
    const rowIndex = Math.floor((y / height) * $settingsStore.rows)
    const columnIndex = Math.floor((x / width) * $settingsStore.columns)

    return {
      rowIndex,
      columnIndex,
    }
  }

  let lastVisitiedRow
  let lastVisitiedColumns

  const handleMouseDown = (event) => {
    mouseClicked = true
    const x = event.x
    const y = event.y

    const { rowIndex, columnIndex } = getRowAndColumnFromCoords(x, y)

    lastVisitiedRow = rowIndex
    lastVisitiedColumns = columnIndex

    toggleCellLifeState(rowIndex, columnIndex)
  }

  const handleMouseUp = (_event) => {
    mouseClicked = false
  }

  const handleMouseMove = (event) => {
    if (!mouseClicked) return

    const x = event.x
    const y = event.y
    const { rowIndex, columnIndex } = getRowAndColumnFromCoords(x, y)

    if (rowIndex !== lastVisitiedRow || columnIndex !== lastVisitiedColumns) {
      toggleCellLifeState(rowIndex, columnIndex)
      lastVisitiedRow = rowIndex
      lastVisitiedColumns = columnIndex
    }
  }

  const toggleCellLifeState = (rowIndex, columnIndex) => {
    if (
      rowIndex <= $settingsStore.rows + 1 &&
      columnIndex <= $settingsStore.columns + 1
    ) {
      lifeStateStore.toggleCellLifeState(rowIndex, columnIndex)
    }
  }

  onMount(() => {
    lifeCanvas.height = height
    lifeCanvas.width = width

    $settingsStore.rows = Math.floor(
      lifeCanvas.height / $settingsStore.cellSize
    )
    $settingsStore.columns = Math.floor(
      lifeCanvas.width / $settingsStore.cellSize
    )

    lifeStateStore.generateNewPopulation()

    unsubscribeSettingsStore = settingsStore.subscribe((settings) => {
      if (settings.paused) stopEvolution()
      else startEvolution()
    })

    unsubscribeLifeStateStore = lifeStateStore.subscribe(drawLife)

    return () => {
      unsubscribeSettingsStore()
      unsubscribeLifeStateStore()
    }
  })
</script>

<canvas
  bind:this={lifeCanvas}
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
/>

<style>
  canvas {
    background-color: #000;
  }
</style>
