export const drawState = (state, cellSize, canvas) => {
  const context = canvas.getContext('2d');

  state.forEach((row, i) => {
    row.forEach((column, j) => {
      context.clearRect(i * cellSize, j * cellSize, cellSize, cellSize)

      if (column) {
        context.fillStyle = 'rgb(56, 219, 224)'
        context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
      } else {
        context.strokeStyle = 'rgb(56, 219, 224)'
        context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
    })
  })
}