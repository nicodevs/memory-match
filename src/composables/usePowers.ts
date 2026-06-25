import { ref } from 'vue'
import type { PowerDef, PowerState } from '@/types'

/**
 * The player's power inventory across a session.
 *
 * Players start with nothing and buy powers in the shop. Every power is
 * single-use per level (`usedThisLevel` disables it). At each new level reusable
 * powers come back, while consumables that were spent are dropped from the
 * inventory (so they can be bought again later).
 */
export function usePowers() {
  const inventory = ref<PowerState[]>([])

  function owns(id: string): boolean {
    return inventory.value.some((entry) => entry.def.id === id)
  }

  /** Add a bought power to the inventory (no-op if already owned). */
  function add(def: PowerDef) {
    if (owns(def.id)) return
    inventory.value.push({ def, usedThisLevel: false })
  }

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

  return { inventory, owns, add, resetForLevel, markUsed }
}
