import type { LevelSize } from './types'

/** The 16-emoji pool, grouped into four categories. */
export const EMOJI_POOL = [
  // Animals
  '🐶',
  '🦁',
  '🐯',
  '🦊',
  // Monsters
  '🧟',
  '🧛',
  '👹',
  '💀',
  // Instruments
  '🎸',
  '🎷',
  '🎹',
  '🥁',
  // Humans
  '🦸',
  '🧑‍🎤',
  '🧑‍🍳',
  '🧑‍🚀',
]

/** Board size per level (1-indexed). Levels beyond this list use DEFAULT_LEVEL_SIZE. */
export const LEVEL_SIZES: LevelSize[] = [
  { cols: 4, rows: 2 }, // Level 1
  { cols: 4, rows: 3 }, // Level 2
]

/** Level 3 and onwards. */
export const DEFAULT_LEVEL_SIZE: LevelSize = { cols: 4, rows: 4 }

/** Resolve the board size for a given level number. */
export function levelSize(level: number): LevelSize {
  return LEVEL_SIZES[level - 1] ?? DEFAULT_LEVEL_SIZE
}

/** Countdown length (seconds) for a level: 20s at level 1, +10s each level. */
export function levelDuration(level: number): number {
  return (level + 1) * 10
}

/** Starting health, and the denominator shown in the HP bar. */
export const MAX_HP = 10

// Timings (ms). The flip values are mirrored by the CSS transitions in MemoryCard.
export const FLIP_MS = 500
export const MATCH_FADE_MS = 400
export const MISMATCH_DELAY_MS = 800
