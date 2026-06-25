import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useGame } from '../useGame'
import { FLIP_MS, MATCH_FADE_MS, MISMATCH_DELAY_MS } from '@/constants'

describe('useGame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('builds a level 1 board of 4 pairs (8 cards), each emoji twice', () => {
    const game = useGame()
    game.startLevel(1)

    expect(game.cols.value).toBe(4)
    expect(game.totalPairs.value).toBe(4)
    expect(game.cards.value).toHaveLength(8)

    const counts = new Map<string, number>()
    for (const card of game.cards.value) {
      counts.set(card.emoji, (counts.get(card.emoji) ?? 0) + 1)
    }
    expect(counts.size).toBe(4)
    for (const count of counts.values()) {
      expect(count).toBe(2)
    }
  })

  it('grows the board with the level (level 2 = 6 pairs, level 3 = 8 pairs)', () => {
    const game = useGame()

    game.startLevel(2)
    expect(game.cards.value).toHaveLength(12)
    expect(game.totalPairs.value).toBe(6)

    game.startLevel(3)
    expect(game.cards.value).toHaveLength(16)
    expect(game.totalPairs.value).toBe(8)

    // Level 3+ all share the 4x4 size.
    game.startLevel(7)
    expect(game.cards.value).toHaveLength(16)
  })

  it('matches a pair: removes both cards and increments the count', async () => {
    const game = useGame()
    game.startLevel(1)

    const first = game.cards.value[0]!
    const second = game.cards.value.find((c) => c.id !== first.id && c.emoji === first.emoji)!

    void game.flip(first.id)
    const pending = game.flip(second.id)

    await vi.advanceTimersByTimeAsync(FLIP_MS)
    expect(first.matched).toBe(true)
    expect(second.matched).toBe(true)

    await vi.advanceTimersByTimeAsync(MATCH_FADE_MS)
    await pending
    expect(first.removed).toBe(true)
    expect(second.removed).toBe(true)
    expect(game.matched.value).toBe(1)
    expect(game.won.value).toBe(false)
  })

  it('flips a mismatched pair back down', async () => {
    const game = useGame()
    game.startLevel(1)

    const first = game.cards.value[0]!
    const second = game.cards.value.find((c) => c.id !== first.id && c.emoji !== first.emoji)!

    void game.flip(first.id)
    const pending = game.flip(second.id)

    await vi.advanceTimersByTimeAsync(MISMATCH_DELAY_MS)
    await pending

    expect(first.faceUp).toBe(false)
    expect(second.faceUp).toBe(false)
    expect(game.matched.value).toBe(0)
  })

  it('wins once every pair is matched', async () => {
    const game = useGame()
    game.startLevel(1)

    // Group the deck into emoji pairs and clear them one by one.
    const byEmoji = new Map<string, number[]>()
    for (const card of game.cards.value) {
      const ids = byEmoji.get(card.emoji) ?? []
      ids.push(card.id)
      byEmoji.set(card.emoji, ids)
    }

    for (const [, ids] of byEmoji) {
      void game.flip(ids[0]!)
      const pending = game.flip(ids[1]!)
      await vi.advanceTimersByTimeAsync(FLIP_MS + MATCH_FADE_MS)
      await pending
    }

    expect(game.matched.value).toBe(4)
    expect(game.won.value).toBe(true)
  })
})
