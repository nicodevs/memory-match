<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps<{ level: number }>()
const emit = defineEmits<{ start: []; menu: [] }>()

const leaving = ref(false)

function dismiss() {
  leaving.value = true
}

// Begin the level only once the fast fade-out has finished.
function onFaded() {
  if (leaving.value) emit('start')
}
</script>

<template>
  <div
    class="fixed inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-slate-900/80 px-6 text-center backdrop-blur-sm transition-opacity duration-200 ease-out"
    :class="leaving ? 'pointer-events-none opacity-0' : 'opacity-100'"
    @transitionend="onFaded"
  >
    <div class="text-7xl">🚀</div>
    <h2 class="text-5xl font-black tracking-tight text-orange-400 sm:text-6xl">Level {{ level }}</h2>
    <div class="flex flex-col items-center gap-4">
      <BaseButton @click="dismiss">Start</BaseButton>
      <BaseButton v-if="level > 1" variant="secondary" @click="emit('menu')">Main Menu</BaseButton>
    </div>
  </div>
</template>
