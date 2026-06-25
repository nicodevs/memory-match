<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ seconds: number }>()

const urgent = computed(() => props.seconds <= 5)
</script>

<template>
  <div
    class="flex items-center gap-2 text-3xl font-black tabular-nums transition-colors"
    :class="urgent ? 'text-red-500' : 'text-white'"
  >
    <span>⏱️</span>
    <span>{{ seconds }}</span>
  </div>
</template>
