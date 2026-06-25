<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ emoji: string; title: string }>()
const emit = defineEmits<{ faded: [] }>()

const leaving = ref(false)

/** Start the fast fade-out; `faded` fires once it finishes. */
function dismiss() {
  leaving.value = true
}

function onTransitionEnd() {
  if (leaving.value) emit('faded')
}
</script>

<template>
  <div
    class="overlay fixed inset-0 z-10 flex flex-col items-center justify-center gap-7 bg-black/70 px-6 text-center backdrop-blur-sm transition-opacity duration-200 ease-out"
    :class="leaving ? 'is-leaving pointer-events-none opacity-0' : 'opacity-100'"
    @transitionend="onTransitionEnd"
  >
    <div class="text-7xl">{{ emoji }}</div>
    <h2 class="brawl-title font-brawl text-5xl text-brawl-yellow sm:text-6xl">{{ title }}</h2>
    <div class="flex w-full max-w-[260px] flex-col items-stretch gap-4">
      <slot :dismiss="dismiss" />
    </div>
  </div>
</template>

<style scoped>
/* Fade in on appear; the fade-out is driven by the opacity transition above. */
.overlay:not(.is-leaving) {
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
