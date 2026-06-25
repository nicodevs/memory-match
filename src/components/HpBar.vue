<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ hp: number; max: number }>()

const percent = computed(() => Math.max(0, (props.hp / props.max) * 100))

const fillColor = computed(() => {
  if (percent.value > 50) return 'bg-emerald-500'
  if (percent.value > 25) return 'bg-amber-500'
  return 'bg-red-500'
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="relative h-5 overflow-hidden rounded-full bg-white/10">
      <div
        class="h-full rounded-full transition-[width] duration-300 ease-out"
        :class="fillColor"
        :style="{ width: `${percent}%` }"
      />
      <span
        class="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums"
      >
        {{ hp }}/{{ max }}
      </span>
    </div>
  </div>
</template>
