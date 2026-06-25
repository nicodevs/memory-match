import { describe, expect, it } from 'vitest'
import { usePowers } from '../usePowers'
import { POWERS } from '@/constants'

describe('usePowers', () => {
  it('starts with the full set of powers, none used', () => {
    const { inventory } = usePowers()
    expect(inventory.value).toHaveLength(POWERS.length)
    expect(inventory.value.every((p) => !p.usedThisLevel)).toBe(true)
  })

  it('marks a power as used this level', () => {
    const { inventory, markUsed } = usePowers()
    markUsed('bait')
    expect(inventory.value.find((p) => p.def.id === 'bait')?.usedThisLevel).toBe(true)
  })

  it('keeps reusable powers but re-arms them on the next level', () => {
    const { inventory, markUsed, resetForLevel } = usePowers()
    markUsed('bait')
    resetForLevel()

    const bait = inventory.value.find((p) => p.def.id === 'bait')
    expect(bait).toBeDefined()
    expect(bait?.usedThisLevel).toBe(false)
  })

  it('drops spent consumables from the inventory for good', () => {
    const { inventory, markUsed, resetForLevel } = usePowers()
    markUsed('snack')
    resetForLevel()

    expect(inventory.value.find((p) => p.def.id === 'snack')).toBeUndefined()
    // An unused consumable survives the reset.
    expect(inventory.value.find((p) => p.def.id === 'time-stop')).toBeDefined()
  })

  it('does not drop a consumable that was never used', () => {
    const { inventory, resetForLevel } = usePowers()
    resetForLevel()
    expect(inventory.value).toHaveLength(POWERS.length)
  })
})
