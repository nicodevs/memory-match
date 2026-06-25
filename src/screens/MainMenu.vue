<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{ play: [] }>()

const showCredits = ref(false)
</script>

<template>
  <div class="brawl-bg flex h-dvh flex-col items-center justify-center gap-7 px-10 text-center">
    <h1 class="brawl-title font-brawl text-4xl leading-[1.15] text-brawl-yellow sm:text-5xl">
      MEMORY<br />MATCH
    </h1>
    <div class="flex w-full max-w-[260px] flex-col items-stretch gap-5">
      <BaseButton class="w-full" @click="emit('play')">PLAY</BaseButton>
      <BaseButton class="w-full" variant="secondary" @click="showCredits = true">CREDITS</BaseButton>
    </div>
  </div>

  <div
    v-if="showCredits"
    class="fade-in fixed inset-0 z-10 flex items-center justify-center bg-[#0a1a55]/70 px-6 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="Credits"
    @click.self="showCredits = false"
  >
    <div class="credits-panel flex w-full max-w-xs flex-col items-center gap-6 px-6 py-8 text-center text-white">
      <h2 class="brawl-title font-brawl text-2xl text-brawl-yellow">CREDITS</h2>
      <p class="font-body text-base font-bold">
        <span class="text-brawl-dim">Programmer:</span> Nico Devs
      </p>
      <BaseButton variant="secondary" @click="showCredits = false">CLOSE</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.credits-panel {
  background: linear-gradient(180deg, #1b2d6e, #142358);
  border: 3px solid #0a1a55;
  border-radius: 16px;
  box-shadow: 0 6px 0 rgba(10, 26, 85, 0.6);
}

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
