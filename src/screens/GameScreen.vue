<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import GameLayout from '@/components/GameLayout.vue'
import GameTimer from '@/components/GameTimer.vue'
import HpBar from '@/components/HpBar.vue'
import IconButton from '@/components/IconButton.vue'
import StartOverlay from './StartOverlay.vue'
import VictoryOverlay from './VictoryOverlay.vue'
import GameOverOverlay from './GameOverOverlay.vue'
import { useGame } from '@/composables/useGame'
import { useSound } from '@/composables/useSound'
import { useTimer } from '@/composables/useTimer'
import { levelDuration } from '@/constants'

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
  endGame,
} = useGame()
const { enabled: soundOn, toggle: toggleSound } = useSound()
const { remaining, start: startTimer, stop: stopTimer } = useTimer()

/** Whether the current level's play (and its timer) has begun. */
const started = ref(false)
/** Coins banked across every level cleared this session. */
const totalCoins = ref(0)
/** Reward for clearing a level: the leftover time plus the surviving lives. */
const coinsEarned = computed(() => remaining.value + hp.value)

startLevel(1)

// Show the level's full duration behind the Start overlay; the live countdown
// takes over once play begins.
const seconds = computed(() => (started.value ? remaining.value : levelDuration(level.value)))

// The timer begins when the Start overlay finishes fading out.
function beginLevel() {
  started.value = true
  startTimer(levelDuration(level.value), endGame)
}

function nextLevel() {
  stopTimer()
  startLevel(level.value + 1)
  started.value = false
}

function retry() {
  stopTimer()
  restart()
  started.value = false
}

// Freeze the timer when the level is won or lost mid-countdown, and bank the
// coins earned the moment the level is cleared.
watch([won, isOver], ([hasWon, over]) => {
  if (hasWon || over) stopTimer()
  if (hasWon) totalCoins.value += coinsEarned.value
})
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
      <GameTimer :seconds="seconds" />
      <GameBoard :cards="cards" :cols="cols" @flip="flip" />
      <HpBar :hp="hp" :max="maxHp" />
    </div>

    <template #footer>
      <span class="font-semibold tracking-wide">PAIRS</span>
      <span class="tabular-nums">{{ matched }} / {{ totalPairs }}</span>
    </template>
  </GameLayout>

  <StartOverlay
    v-if="!started && !won && !isOver"
    :level="level"
    @start="beginLevel"
    @menu="emit('close')"
  />
  <VictoryOverlay
    v-if="won"
    :level="level"
    :time-left="remaining"
    :lives-left="hp"
    :coins-earned="coinsEarned"
    :total-coins="totalCoins"
    @continue="nextLevel"
  />
  <GameOverOverlay v-if="isOver" @retry="retry" @menu="emit('close')" />
</template>
