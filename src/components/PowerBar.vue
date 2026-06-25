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
  height: 3.5rem;
  width: 3.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 3px solid #0a1a55;
  background: linear-gradient(180deg, #fac602, #d4a800);
  font-size: 1.75rem;
  line-height: 1;
  box-shadow:
    0 4px 0 rgba(10, 26, 85, 0.6),
    inset 0 2px 3px rgba(255, 255, 255, 0.4);
  transition:
    transform 120ms ease,
    opacity 200ms ease,
    box-shadow 120ms ease,
    filter 120ms ease;
}

.power:not(:disabled):hover {
  filter: brightness(1.08);
}

.power:not(:disabled):active {
  transform: translateY(3px);
  box-shadow:
    0 1px 0 rgba(10, 26, 85, 0.6),
    inset 0 2px 3px rgba(255, 255, 255, 0.4);
}

/* A dashed border on consumables hints they're spent for good once used. */
.power.is-spent {
  border-style: dashed;
}

.power:disabled {
  cursor: not-allowed;
  opacity: 0.4;
  box-shadow: none;
  filter: grayscale(0.5);
}
</style>
