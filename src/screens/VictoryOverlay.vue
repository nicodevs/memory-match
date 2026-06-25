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
  <div class="fixed inset-0 z-10 flex flex-col bg-slate-900/95 text-white backdrop-blur-sm">
    <main class="flex flex-1 flex-col items-center justify-center gap-6 overflow-auto px-6 py-8 text-center">
      <div class="text-7xl">🏆</div>
      <div class="flex flex-col items-center gap-1">
        <h2 class="text-5xl font-black tracking-tight text-orange-400 sm:text-6xl">VICTORY!</h2>
        <p class="text-sm font-semibold tracking-widest text-white/60">LEVEL {{ level }} COMPLETE</p>
      </div>

      <div class="flex w-full max-w-xs flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
        <div class="flex items-center justify-between">
          <span class="text-white/70">⏱️ Time left</span>
          <span class="font-bold tabular-nums">{{ timeLeft }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-white/70">❤️ Lives left</span>
          <span class="font-bold tabular-nums">{{ livesLeft }}</span>
        </div>
        <div class="flex items-center justify-between border-t border-white/10 pt-3">
          <span class="text-white/70">💰 Coins earned</span>
          <span class="font-bold tabular-nums text-orange-400">{{ coinsEarned }}</span>
        </div>
      </div>

      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-semibold tracking-widest text-white/60">TOTAL COINS</span>
        <span class="text-3xl font-black tabular-nums">💰 {{ totalCoins }}</span>
      </div>
    </main>

    <footer class="flex h-20 shrink-0 items-center justify-center border-t border-white/10 px-4">
      <BaseButton @click="emit('continue')">CONTINUE</BaseButton>
    </footer>
  </div>
</template>
