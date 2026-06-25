<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{ play: [] }>()

const showCredits = ref(false)
</script>

<template>
  <div
    class="flex h-dvh flex-col items-center justify-center gap-10 bg-slate-900 px-6 text-center text-white"
  >
    <div class="flex flex-col items-center gap-3">
      <div class="text-6xl">🧠</div>
      <h1 class="text-5xl font-black tracking-tight sm:text-6xl">MEMORY MATCH</h1>
      <p class="text-white/60">Flip the cards and find every pair.</p>
    </div>
    <div class="flex flex-col items-center gap-4">
      <BaseButton @click="emit('play')">PLAY</BaseButton>
      <BaseButton variant="secondary" @click="showCredits = true">CREDITS</BaseButton>
    </div>
  </div>

  <div
    v-if="showCredits"
    class="fade-in fixed inset-0 z-10 flex items-center justify-center bg-slate-900/80 px-6 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="Credits"
    @click.self="showCredits = false"
  >
    <div
      class="flex w-full max-w-xs flex-col items-center gap-6 rounded-2xl border border-white/10 bg-slate-800 px-6 py-8 text-center text-white shadow-2xl"
    >
      <h2 class="text-2xl font-black tracking-tight">CREDITS</h2>
      <p class="text-white/80"><span class="text-white/60">Programmer:</span> Nico Devs</p>
      <BaseButton variant="secondary" @click="showCredits = false">Close</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fade-in 200ms ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
