<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import GameLayout from '@/components/GameLayout.vue'
import GameTimer from '@/components/GameTimer.vue'
import HpBar from '@/components/HpBar.vue'
import IconButton from '@/components/IconButton.vue'
import PowerBar from '@/components/PowerBar.vue'
import StartOverlay from './StartOverlay.vue'
import VictoryOverlay from './VictoryOverlay.vue'
import GameOverOverlay from './GameOverOverlay.vue'
import { useGame } from '@/composables/useGame'
import { usePowers } from '@/composables/usePowers'
import { useSound } from '@/composables/useSound'
import { useTimer } from '@/composables/useTimer'
import { levelDuration, SNACK_HEAL, TIME_STOP_MS } from '@/constants'
import type { PowerState } from '@/types'

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
  heal,
  peek,
  endGame,
} = useGame()
const { enabled: soundOn, toggle: toggleSound } = useSound()
const { remaining, frozen, start: startTimer, stop: stopTimer, freeze } = useTimer()
const { inventory, resetForLevel, markUsed } = usePowers()

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

/** Powers are only usable during live play, before the level is decided. */
const playing = computed(() => started.value && !won.value && !isOver.value)

// The timer begins when the Start overlay finishes fading out.
function beginLevel() {
  started.value = true
  startTimer(levelDuration(level.value), endGame)
}

function onUsePower(id: string) {
  const power = inventory.value.find((entry) => entry.def.id === id)
  if (power) usePower(power)
}

/** Apply a power's effect, then mark it spent for this level. */
function usePower(power: PowerState) {
  if (!playing.value || power.usedThisLevel) return

  switch (power.def.id) {
    case 'snack':
      heal(SNACK_HEAL)
      break
    case 'time-stop':
      freeze(TIME_STOP_MS)
      break
    default:
      if (power.def.category) peek(power.def.category)
  }

  markUsed(power.def.id)
}

function nextLevel() {
  stopTimer()
  startLevel(level.value + 1)
  resetForLevel()
  started.value = false
}

function retry() {
  stopTimer()
  restart()
  resetForLevel()
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
      <GameTimer :seconds="seconds" :frozen="started && frozen" />
      <div class="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row lg:items-start lg:justify-center lg:gap-5">
        <div class="flex w-full flex-col items-center gap-6 lg:w-[28rem]">
          <GameBoard :cards="cards" :cols="cols" @flip="flip" />
          <HpBar :hp="hp" :max="maxHp" />
        </div>
        <PowerBar :powers="inventory" :playing="playing" @use="onUsePower" />
      </div>
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
