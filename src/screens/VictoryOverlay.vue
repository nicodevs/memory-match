<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{ continue: [] }>()
</script>

<template>
  <div
    class="fixed inset-0 z-10 flex flex-col items-center justify-center gap-10 bg-slate-900/80 px-6 text-center backdrop-blur-sm"
  >
    <h2 class="text-6xl font-black tracking-tight text-orange-400 sm:text-7xl">VICTORY</h2>
    <BaseButton @click="emit('continue')">CONTINUE</BaseButton>
  </div>
</template>
