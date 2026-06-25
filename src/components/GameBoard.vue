<script setup lang="ts">
import MemoryCard from './MemoryCard.vue'
import type { Card } from '@/types'

defineProps<{ cards: Card[]; cols: number }>()
const emit = defineEmits<{ flip: [id: number] }>()
</script>

<template>
  <div class="board w-full max-w-md rounded-2xl p-3.5">
    <div
      class="grid w-full gap-2"
      :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
    >
      <MemoryCard v-for="card in cards" :key="card.id" :card="card" @flip="emit('flip', card.id)" />
    </div>
  </div>
</template>

<style scoped>
.board {
  background: linear-gradient(180deg, #1b2d6e, #142358);
  border: 3px solid #0a1a55;
  box-shadow: 0 5px 0 rgba(10, 26, 85, 0.7);
}
</style>
