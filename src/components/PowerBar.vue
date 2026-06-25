<script setup lang="ts">
import type { PowerState } from '@/types'

defineProps<{ powers: PowerState[]; playing: boolean }>()
const emit = defineEmits<{ use: [id: string] }>()
</script>

<template>
  <!-- A row of power buttons below the board on mobile, a column beside it on desktop. -->
  <div class="flex flex-row flex-wrap justify-center gap-2 lg:flex-col lg:flex-nowrap">
    <button
      v-for="power in powers"
      :key="power.def.id"
      type="button"
      class="power"
      :class="{ 'is-spent': power.def.kind === 'consumable' }"
      :disabled="!playing || power.usedThisLevel"
      :title="`${power.def.name}${power.def.kind === 'consumable' ? ' (single use)' : ''}`"
      :aria-label="power.def.name"
      @click="emit('use', power.def.id)"
    >
      <span aria-hidden="true">{{ power.def.icon }}</span>
    </button>
  </div>
</template>

<style scoped>
.power {
  display: flex;
  height: 3rem;
  width: 3rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 2px solid #ca8a04; /* amber-600 */
  background: linear-gradient(145deg, #fde047, #facc15); /* yellow-300 → yellow-400 */
  font-size: 1.5rem;
  line-height: 1;
  color: #1e293b;
  box-shadow: 0 2px 0 #ca8a04;
  transition:
    transform 120ms ease,
    opacity 200ms ease,
    box-shadow 120ms ease;
}

.power:not(:disabled):hover {
  background: linear-gradient(145deg, #fef08a, #fde047);
}

.power:not(:disabled):active {
  transform: translateY(2px);
  box-shadow: 0 0 0 #ca8a04;
}

/* A small notch on consumables hints they're spent for good once used. */
.power.is-spent {
  border-style: dashed;
}

.power:disabled {
  cursor: not-allowed;
  opacity: 0.35;
  box-shadow: none;
  filter: grayscale(0.4);
}
</style>
