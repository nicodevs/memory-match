import { computed, ref } from 'vue'
import {
  categoryOf,
  EMOJI_POOL,
  FLIP_MS,
  levelSize,
  MATCH_FADE_MS,
  MAX_HP,
  MISMATCH_DELAY_MS,
  PEEK_MS,
} from '@/constants'
import type { Card, EmojiCategory } from '@/types'

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
        peeking: false,
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
  /** Timers for mismatched pairs currently animating back face down. */
  const mismatchTimers = new Set<ReturnType<typeof setTimeout>>()

  const size = computed(() => levelSize(level.value))
  const cols = computed(() => size.value.cols)
  const totalPairs = computed(() => (size.value.cols * size.value.rows) / 2)
  const won = computed(() => totalPairs.value > 0 && matched.value === totalPairs.value)

  function startLevel(next: number) {
    cancelMismatchTimers()
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
      // Mismatch: costs 1 HP.
      hp.value--
      selection.value = []
      if (hp.value <= 0) {
        endGame()
        return
      }
      // Keep both cards face up briefly so the player sees the miss, then flip
      // them back. The selection is cleared and the flip-back is scheduled (not
      // awaited), so the rest of the board stays fully interactive meanwhile and
      // this pair plays its flip-back animation through to the end undisturbed.
      const timer = setTimeout(() => {
        first.faceUp = false
        second.faceUp = false
        mismatchTimers.delete(timer)
      }, MISMATCH_DELAY_MS)
      mismatchTimers.add(timer)
    }
  }

  /** Cancel any in-flight mismatch flip-backs (on game over / level change). */
  function cancelMismatchTimers() {
    for (const timer of mismatchTimers) clearTimeout(timer)
    mismatchTimers.clear()
  }

  /** Game over: reveal every remaining card (these do not count as matches). */
  function endGame() {
    // Drop any pending flip-backs so they can't hide cards we're about to reveal.
    cancelMismatchTimers()
    for (const card of cards.value) {
      if (!card.removed) card.faceUp = true
    }
    isOver.value = true
  }

  /** Flip a face-down card up; evaluates the pair once two are selected. */
  async function flip(id: number) {
    if (isOver.value) return
    const card = byId(id)
    if (!card || card.faceUp || card.matched || card.removed) return

    // A confirmed match is still playing its enlarge/fade animation — ignore.
    // (A mismatched pair flipping back does NOT block: it has left the selection,
    // so its flip-back animation finishes on its own while play continues.)
    if (selection.value.length >= 2) return

    card.faceUp = true
    selection.value.push(id)

    if (selection.value.length === 2) {
      await resolveSelection()
    }
  }

  /** Restore HP (Snack power), never exceeding the maximum. Inert once over. */
  function heal(amount: number) {
    if (isOver.value) return
    hp.value = Math.min(MAX_HP, hp.value + amount)
  }

  /**
   * Briefly reveal every still-hidden card of a category (a peek power). Peeked
   * cards show their face for PEEK_MS without becoming a selection or a match;
   * each peek runs on its own timer so overlapping peeks don't interfere.
   */
  function peek(category: EmojiCategory) {
    const targets = cards.value.filter(
      (card) =>
        !card.faceUp &&
        !card.matched &&
        !card.removed &&
        !card.peeking &&
        categoryOf(card.emoji) === category,
    )
    for (const card of targets) card.peeking = true
    setTimeout(() => {
      for (const card of targets) card.peeking = false
    }, PEEK_MS)
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
    heal,
    peek,
    endGame,
  }
}
