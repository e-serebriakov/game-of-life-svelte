import { writable, get } from 'svelte/store'

import { settingsStore } from './settingsStore'

const copyState = (state) => state.map((column) => [...column])

const periodical = (x, sideCapacity) => {
  if (x < 0) {
    return x + sideCapacity
  }

  if (x >= sideCapacity) {
    return x - sideCapacity
  }

  return x
}

export const countNeighbors = (state, x, y) => {
  let neighborsCount = 0

  const xFrom = x - 1
  const xTo = x + 1
  const yFrom = y - 1
  const yTo = y + 1

  for (let i = xFrom; i <= xTo; i++) {
    for (let j = yFrom; j <= yTo; j++) {
      const iPeriodical = periodical(i, state.length)
      const jPeriodical = periodical(j, state[0].length)

      const neighborCell = state[iPeriodical][jPeriodical]
      const isAlive = neighborCell === 1

      if (isAlive && !(iPeriodical === x && jPeriodical === y)) {
        neighborsCount += 1
      }
    }
  }

  return neighborsCount
}

const isGoingLive = (state, x, y) => {
  const cell = state[x][y]
  const isAlive = cell === 1
  const neighborsCount = countNeighbors(state, x, y)

  if (isAlive) {
    return neighborsCount === 2 || neighborsCount === 3
  }

  return neighborsCount === 3
}

export const calculateNextState = (currentState) => {
  const state = copyState(currentState)

  for (let i = 0; i < currentState.length; i++) {
    for (let j = 0; j < currentState[i].length; j++) {
      state[i][j] = isGoingLive(currentState, i, j) ? 1 : 0
    }
  }

  return state
}

const generateNewState = ({ rows, columns, lifeChance }) => {
  const state = []

  for (let i = 0; i < columns; i++) {
    state[i] = []

    for (let j = 0; j < rows; j++) {
      state[i][j] = Math.random() < lifeChance ? 1 : 0
    }
  }

  return state
}

export const lifePrevStateStore = writable([])

function createLifeStateStore(initialState) {
  const { subscribe, update } = writable({
    prevState: initialState,
    currentState: initialState
  })
  const settingsState = get(settingsStore)

  return {
    subscribe,
    generateNewPopulation: () => {
      update(state => {
        state.currentState = generateNewState(
          { rows: settingsState.rows, columns: settingsState.columns, lifeChance: settingsState.lifeChance },
        )
        return state
      })
    },
    toggleCellLifeState: (rowIndex, columnIndex) => {
      update((state) => {
        state.prevState = copyState(state.currentState)
        state.currentState[columnIndex][rowIndex] = state.currentState[columnIndex][rowIndex] === 1 ? 0 : 1

        return state
      })
    },
    evolve: () => {
      update(state => {
        state.prevState = [...state.currentState]
        state.currentState = calculateNextState(state.currentState)
        return state
      })
    },
    clear: () => {
      update(state => {
        state.prevState = [...state.currentState]
        state.currentState = generateNewState(
          { rows: settingsState.rows, columns: settingsState.columns, lifeChance: 0 },
        )

        return state
      })
    }
  }
}

export const lifeStateStore = createLifeStateStore([[]])
