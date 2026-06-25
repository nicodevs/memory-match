<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{ retry: []; menu: [] }>()
</script>

<template>
  <div
    class="fade-in fixed inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-slate-900/80 px-6 text-center backdrop-blur-sm"
  >
    <div class="text-7xl">🤬</div>
    <h2 class="text-5xl font-black tracking-tight text-red-500 sm:text-6xl">Game Over</h2>
    <div class="flex flex-col items-center gap-4">
      <BaseButton @click="emit('retry')">Try Again</BaseButton>
      <BaseButton variant="secondary" @click="emit('menu')">Main Menu</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fade-in 400ms ease-out;
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
