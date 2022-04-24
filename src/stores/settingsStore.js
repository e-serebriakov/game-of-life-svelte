import { writable } from 'svelte/store'

const DEFAULT_LIFE_CHANCE = 0.15
const DEFAULT_CELL_SIZE = 8
const DEFAULT_LIVE_CELL_COLOR = '#38dbe0'

export const settingsStore = writable({
  updateRate: 50,
  paused: true,
  columns: 0,
  rows: 0,
  lifeChance: DEFAULT_LIFE_CHANCE,
  cellSize: DEFAULT_CELL_SIZE,
  liveCellColor: DEFAULT_LIVE_CELL_COLOR,
})
