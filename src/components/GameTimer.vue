<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ seconds: number; frozen?: boolean }>(), { frozen: false })

const urgent = computed(() => !props.frozen && props.seconds <= 5)

const color = computed(() => {
  if (props.frozen) return 'text-sky-300'
  return urgent.value ? 'text-red-500' : 'text-white'
})
</script>

<template>
  <div
    class="flex items-center gap-2 text-3xl font-black tabular-nums transition-colors"
    :class="[color, { 'animate-pulse': frozen }]"
  >
    <span>{{ frozen ? '⏸️' : '⏱️' }}</span>
    <span>{{ seconds }}</span>
  </div>
</template>
