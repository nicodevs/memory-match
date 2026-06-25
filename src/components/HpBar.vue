<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ hp: number; max: number }>()

const percent = computed(() => Math.max(0, (props.hp / props.max) * 100))

const fillColor = computed(() => {
  if (percent.value > 50) return 'fill--healthy'
  if (percent.value > 25) return 'fill--warn'
  return 'fill--low'
})
</script>

<template>
  <div class="flex w-full max-w-md items-center gap-2 px-1">
    <span class="text-xl leading-none" aria-hidden="true">❤️</span>
    <div class="track relative h-5 flex-1 overflow-hidden rounded-[10px]">
      <div
        class="h-full rounded-[8px] transition-[width] duration-300 ease-out"
        :class="fillColor"
        :style="{ width: `${percent}%` }"
      />
    </div>
    <span class="font-brawl text-xs text-white tabular-nums"> {{ hp }}/{{ max }} </span>
  </div>
</template>

<style scoped>
.track {
  background: #142d7a;
  border: 2.5px solid #0a1a55;
  box-shadow: inset 0 2px 4px rgba(10, 26, 85, 0.6);
}

.fill--healthy {
  background: linear-gradient(180deg, #2cf0ff, #1474e0);
}

.fill--warn {
  background: linear-gradient(180deg, #facc15, #d4a800);
}

.fill--low {
  background: linear-gradient(180deg, #ff5a3c, #d4321a);
}
</style>
