<script setup lang="ts">
import MemoryCard from './MemoryCard.vue'
import type { Card } from '@/types'

defineProps<{ cards: Card[]; cols: number }>()
const emit = defineEmits<{ flip: [id: number] }>()
</script>

<template>
  <div
    class="grid w-full max-w-md gap-3"
    :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
  >
    <MemoryCard v-for="card in cards" :key="card.id" :card="card" @flip="emit('flip', card.id)" />
  </div>
</template>
