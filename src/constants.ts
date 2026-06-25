import type { EmojiCategory, LevelSize, PowerDef } from './types'

/** The 16-emoji pool, four emojis per category. */
export const EMOJI_CATEGORIES: Record<EmojiCategory, readonly string[]> = {
  animals: ['🐶', '🦁', '🐯', '🦊'],
  monsters: ['🧟', '🧛', '👹', '💀'],
  instruments: ['🎸', '🎷', '🎹', '🥁'],
  humans: ['🦸', '🧑‍🎤', '🧑‍🍳', '🧑‍🚀'],
}

export const EMOJI_POOL: string[] = Object.values(EMOJI_CATEGORIES).flat()

/** Reverse lookup: which category an emoji belongs to. */
const CATEGORY_BY_EMOJI = new Map<string, EmojiCategory>(
  (Object.entries(EMOJI_CATEGORIES) as [EmojiCategory, readonly string[]][]).flatMap(
    ([category, emojis]) => emojis.map((emoji) => [emoji, category] as const),
  ),
)

export function categoryOf(emoji: string): EmojiCategory | undefined {
  return CATEGORY_BY_EMOJI.get(emoji)
}

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

// Power effects.
/** HP restored by the Snack power (capped at MAX_HP). */
export const SNACK_HEAL = 5
/** How long the Time Stop power freezes the countdown. */
export const TIME_STOP_MS = 5000
/** How long a peeked card stays revealed before flipping back. */
export const PEEK_MS = 1000

/**
 * Every power in the game. Players start with none and buy them in the shop.
 * Reusable powers stay once bought; consumables leave the inventory when spent.
 * Peek powers carry the category they reveal.
 */
export const POWERS: PowerDef[] = [
  {
    id: 'snack',
    name: 'Snack',
    icon: '🍔',
    description: 'Restore 5 HP.',
    price: 10,
    kind: 'consumable',
  },
  {
    id: 'time-stop',
    name: 'Time Stop',
    icon: '⏸️',
    description: 'Freeze the timer for 5 seconds.',
    price: 10,
    kind: 'consumable',
  },
  {
    id: 'bait',
    name: 'Bait',
    icon: '🍖',
    description: 'Peek at all animal cards for 1 second.',
    price: 15,
    kind: 'reusable',
    category: 'animals',
  },
  {
    id: 'light-flash',
    name: 'Light Flash',
    icon: '🔦',
    description: 'Peek at all monster cards for 1 second.',
    price: 15,
    kind: 'reusable',
    category: 'monsters',
  },
  {
    id: 'sound-check',
    name: 'Sound Check',
    icon: '🎵',
    description: 'Peek at all instrument cards for 1 second.',
    price: 15,
    kind: 'reusable',
    category: 'instruments',
  },
  {
    id: 'piece-of-cake',
    name: 'Piece of Cake',
    icon: '🍰',
    description: 'Peek at all human cards for 1 second.',
    price: 15,
    kind: 'reusable',
    category: 'humans',
  },
]
