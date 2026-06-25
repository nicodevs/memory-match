import { describe, expect, it } from 'vitest'
import { usePowers } from '../usePowers'
import { POWERS } from '@/constants'

const def = (id: string) => POWERS.find((p) => p.id === id)!

describe('usePowers', () => {
  it('starts with an empty inventory', () => {
    const { inventory } = usePowers()
    expect(inventory.value).toHaveLength(0)
  })

  it('adds a bought power to the inventory', () => {
    const { inventory, owns, add } = usePowers()
    add(def('bait'))
    expect(owns('bait')).toBe(true)
    expect(inventory.value).toHaveLength(1)
    expect(inventory.value[0]!.usedThisLevel).toBe(false)
  })

  it('does not add the same power twice', () => {
    const { inventory, add } = usePowers()
    add(def('bait'))
    add(def('bait'))
    expect(inventory.value).toHaveLength(1)
  })

  it('marks a power as used this level', () => {
    const { inventory, add, markUsed } = usePowers()
    add(def('bait'))
    markUsed('bait')
    expect(inventory.value.find((p) => p.def.id === 'bait')?.usedThisLevel).toBe(true)
  })

  it('keeps reusable powers but re-arms them on the next level', () => {
    const { inventory, add, markUsed, resetForLevel } = usePowers()
    add(def('bait'))
    markUsed('bait')
    resetForLevel()

    const bait = inventory.value.find((p) => p.def.id === 'bait')
    expect(bait).toBeDefined()
    expect(bait?.usedThisLevel).toBe(false)
  })

  it('drops spent consumables so they can be bought again', () => {
    const { owns, add, markUsed, resetForLevel } = usePowers()
    add(def('snack'))
    markUsed('snack')
    resetForLevel()
    expect(owns('snack')).toBe(false)
  })

  it('keeps a consumable that was never used', () => {
    const { owns, add, resetForLevel } = usePowers()
    add(def('time-stop'))
    resetForLevel()
    expect(owns('time-stop')).toBe(true)
  })
})
