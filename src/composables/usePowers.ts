import { ref } from 'vue'
import { POWERS } from '@/constants'
import type { PowerState } from '@/types'

/**
 * The player's power inventory across a session.
 *
 * Every power is single-use per level (`usedThisLevel` disables it). At each new
 * level reusable powers come back, while consumables that were spent are dropped
 * from the inventory for good.
 */
export function usePowers() {
  const inventory = ref<PowerState[]>(POWERS.map((def) => ({ def, usedThisLevel: false })))

  /** Carry the inventory into a fresh level: drop spent consumables, re-arm the rest. */
  function resetForLevel() {
    inventory.value = inventory.value
      .filter((power) => !(power.usedThisLevel && power.def.kind === 'consumable'))
      .map((power) => ({ def: power.def, usedThisLevel: false }))
  }

  /** Mark a power as used this level (disabling it until the next reset). */
  function markUsed(id: string) {
    const power = inventory.value.find((entry) => entry.def.id === id)
    if (power) power.usedThisLevel = true
  }

  return { inventory, resetForLevel, markUsed }
}
