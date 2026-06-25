<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import GameLayout from '@/components/GameLayout.vue'
import IconButton from '@/components/IconButton.vue'
import VictoryOverlay from './VictoryOverlay.vue'
import { useGame } from '@/composables/useGame'
import { useSound } from '@/composables/useSound'

const emit = defineEmits<{ close: [] }>()

const { level, cards, cols, matched, totalPairs, won, startLevel, flip } = useGame()
const { enabled: soundOn, toggle: toggleSound } = useSound()

startLevel(1)

function nextLevel() {
  startLevel(level.value + 1)
}
</script>

<template>
  <GameLayout>
    <template #header>
      <IconButton aria-label="Close game" @click="emit('close')">✕</IconButton>
      <h1 class="text-xl font-bold tracking-wide">LEVEL {{ level }}</h1>
      <IconButton :aria-label="soundOn ? 'Mute sound' : 'Unmute sound'" @click="toggleSound">
        {{ soundOn ? '🔊' : '🔇' }}
      </IconButton>
    </template>

    <GameBoard :cards="cards" :cols="cols" @flip="flip" />

    <template #footer>
      <span class="font-semibold tracking-wide">PAIRS</span>
      <span class="tabular-nums">{{ matched }} / {{ totalPairs }}</span>
    </template>
  </GameLayout>

  <VictoryOverlay v-if="won" @continue="nextLevel" />
</template>
