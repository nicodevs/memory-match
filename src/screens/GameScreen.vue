<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import GameLayout from '@/components/GameLayout.vue'
import HpBar from '@/components/HpBar.vue'
import IconButton from '@/components/IconButton.vue'
import VictoryOverlay from './VictoryOverlay.vue'
import GameOverOverlay from './GameOverOverlay.vue'
import { useGame } from '@/composables/useGame'
import { useSound } from '@/composables/useSound'

const emit = defineEmits<{ close: [] }>()

const {
  level,
  cards,
  cols,
  matched,
  totalPairs,
  hp,
  maxHp,
  isOver,
  won,
  startLevel,
  restart,
  flip,
} = useGame()
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

    <div class="flex w-full flex-col items-center gap-6">
      <GameBoard :cards="cards" :cols="cols" @flip="flip" />
      <HpBar :hp="hp" :max="maxHp" />
    </div>

    <template #footer>
      <span class="font-semibold tracking-wide">PAIRS</span>
      <span class="tabular-nums">{{ matched }} / {{ totalPairs }}</span>
    </template>
  </GameLayout>

  <VictoryOverlay v-if="won" @continue="nextLevel" />
  <GameOverOverlay v-if="isOver" @retry="restart" />
</template>
