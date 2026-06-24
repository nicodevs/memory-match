<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{ play: [] }>()
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
    <BaseButton @click="emit('play')">PLAY</BaseButton>
  </div>
</template>
