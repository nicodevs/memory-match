import { computed, ref } from 'vue'
import {
  EMOJI_POOL,
  FLIP_MS,
  levelSize,
  MATCH_FADE_MS,
  MAX_HP,
  MISMATCH_DELAY_MS,
} from '@/constants'
import type { Card } from '@/types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Fisher–Yates shuffle, returning a new array. */
function shuffle<T>(input: T[]): T[] {
  const arr = input.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]!
    arr[i] = arr[j]!
    arr[j] = tmp
  }
  return arr
}

let nextCardId = 0

/** Pick `pairs` unique emojis, duplicate each into a pair, and shuffle the deck. */
function buildDeck(pairs: number): Card[] {
  const chosen = shuffle(EMOJI_POOL).slice(0, pairs)
  const deck = chosen
    .flatMap((emoji) => [emoji, emoji])
    .map(
      (emoji): Card => ({
        id: nextCardId++,
        emoji,
        faceUp: false,
        matched: false,
        removed: false,
      }),
    )
  return shuffle(deck)
}

/**
 * Core game state and rules for a single Memory Match session.
 * Owns the deck, the current selection, and the flip/match flow.
 */
export function useGame() {
  const level = ref(1)
  const cards = ref<Card[]>([])
  const matched = ref(0)
  const hp = ref(MAX_HP)
  const isOver = ref(false)
  /** Ids of the (at most two) face-up cards in the current selection. */
  const selection = ref<number[]>([])

  const size = computed(() => levelSize(level.value))
  const cols = computed(() => size.value.cols)
  const totalPairs = computed(() => (size.value.cols * size.value.rows) / 2)
  const won = computed(() => totalPairs.value > 0 && matched.value === totalPairs.value)

  function startLevel(next: number) {
    level.value = next
    matched.value = 0
    hp.value = MAX_HP
    isOver.value = false
    selection.value = []
    cards.value = buildDeck(totalPairs.value)
  }

  /** Restart the current level: HP resets, the deck is rebuilt. */
  function restart() {
    startLevel(level.value)
  }

  function byId(id: number): Card | undefined {
    return cards.value.find((card) => card.id === id)
  }

  async function resolveSelection() {
    const [firstId, secondId] = selection.value
    const first = byId(firstId!)
    const second = byId(secondId!)
    if (!first || !second) {
      selection.value = []
      return
    }

    if (first.emoji === second.emoji) {
      // Match: let the second card finish flipping, then enlarge + fade out.
      await wait(FLIP_MS)
      first.matched = true
      second.matched = true
      selection.value = []
      await wait(MATCH_FADE_MS)
      first.removed = true
      second.removed = true
      matched.value++
    } else {
      // Mismatch: costs 1 HP. Pause so the player sees both cards.
      hp.value--
      await wait(MISMATCH_DELAY_MS)
      selection.value = []
      if (hp.value <= 0) {
        endGame()
        return
      }
      // Flip the pair back. Clearing the selection above keeps the rest of the
      // board clickable during the flip-back.
      first.faceUp = false
      second.faceUp = false
    }
  }

  /** Game over: reveal every remaining card (these do not count as matches). */
  function endGame() {
    for (const card of cards.value) {
      if (!card.removed) card.faceUp = true
    }
    isOver.value = true
  }

  /** Flip a face-down card up; evaluates the pair once two are selected. */
  async function flip(id: number) {
    if (isOver.value || selection.value.length >= 2) return
    const card = byId(id)
    if (!card || card.faceUp || card.matched || card.removed) return

    card.faceUp = true
    selection.value.push(id)

    if (selection.value.length === 2) {
      await resolveSelection()
    }
  }

  return {
    level,
    cards,
    cols,
    matched,
    totalPairs,
    hp,
    maxHp: MAX_HP,
    isOver,
    won,
    startLevel,
    restart,
    flip,
    endGame,
  }
}
