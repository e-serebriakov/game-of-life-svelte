import { writable, get } from 'svelte/store'

import {settingsStore} from './settingsStore'

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

const isGoingLive = (state, x, y) =>  {
  const cell = state[x][y]
  const isAlive = cell === 1
  const neighborsCount = countNeighbors(state, x, y)

  if (isAlive) {
    return neighborsCount === 2 || neighborsCount === 3 
  }

  return neighborsCount === 3
}

export const calculateNextState = (currentState) => {
  const state = JSON.parse(JSON.stringify(currentState)) // copy state TODO: think about optimization

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

  return state;
}

function createLifeStateStore() {
  const {subscribe, set, update} = writable([]);
  const settingsState = get(settingsStore);

  return {
    subscribe,
    generateNewPopulation: () => {
      set(
        generateNewState(
          { rows: settingsState.rows, columns: settingsState.columns, lifeChance: settingsState.lifeChance},
        )
      )
    },
    evolve: () => {
      update(calculateNextState)
    },
    clear: () => {
      set(
        generateNewState(
          { rows: settingsState.rows, columns: settingsState.columns, lifeChance: 0},
        )
      )
    }
  }
}

export const lifeStateStore = createLifeStateStore();