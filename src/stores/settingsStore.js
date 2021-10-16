import { writable } from 'svelte/store'

const STANDARD_LIFE_CHANCE = 0.15
const STANDARD_CELL_SIZE = 20

export const settingsStore = writable({
  updateRate: 50,
  paused: true,
  columns: 0,
  rows: 0,
  lifeChance: STANDARD_LIFE_CHANCE,
  cellSize: STANDARD_CELL_SIZE,
})