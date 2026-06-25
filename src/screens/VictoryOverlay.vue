<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

defineProps<{
  level: number
  timeLeft: number
  livesLeft: number
  coinsEarned: number
  totalCoins: number
}>()

const emit = defineEmits<{ continue: [] }>()
</script>

<template>
  <div class="brawl-bg fixed inset-0 z-10 flex flex-col text-white">
    <main class="flex flex-1 flex-col items-center justify-center gap-5 overflow-auto px-6 py-8 text-center">
      <div class="flex flex-col items-center gap-2">
        <div class="text-6xl">🏆</div>
        <h2 class="brawl-title font-brawl text-5xl text-brawl-yellow">VICTORY!</h2>
        <p class="font-brawl text-base tracking-wide text-brawl-dim">LEVEL {{ level }} COMPLETE</p>
      </div>

      <div class="summary flex w-full max-w-xs flex-col gap-3.5 rounded-2xl px-5 py-4">
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 font-brawl text-base">⏱️ TIME LEFT</span>
          <span class="font-brawl text-base text-brawl-yellow tabular-nums">{{ timeLeft }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 font-brawl text-base">❤️ LIVES LEFT</span>
          <span class="font-brawl text-base text-brawl-yellow tabular-nums">{{ livesLeft }}</span>
        </div>
        <div class="h-0.5 w-full rounded bg-brawl-border" />
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 font-brawl text-base">💰 COINS</span>
          <span class="font-brawl text-base text-brawl-yellow tabular-nums">{{ coinsEarned }}</span>
        </div>
      </div>

      <div class="flex flex-col items-center gap-1">
        <span class="font-brawl text-base tracking-wide text-brawl-dim">TOTAL COINS</span>
        <span class="brawl-title flex items-center gap-2 font-brawl text-5xl text-white tabular-nums">
          💰 {{ totalCoins }}
        </span>
      </div>
    </main>

    <footer class="flex shrink-0 items-center justify-center px-6 pb-7">
      <BaseButton class="w-full max-w-md" @click="emit('continue')">CONTINUE</BaseButton>
    </footer>
  </div>
</template>

<style scoped>
.summary {
  background: #1b2d6e;
  border: 3px solid #0a1a55;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.35);
}
</style>
