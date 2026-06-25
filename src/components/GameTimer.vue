<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ seconds: number; frozen?: boolean }>(), { frozen: false })

const urgent = computed(() => !props.frozen && props.seconds <= 5)

const variant = computed(() => {
  if (props.frozen) return 'timer--frozen'
  return urgent.value ? 'timer--urgent' : 'timer--normal'
})
</script>

<template>
  <div class="w-full max-w-md">
    <div
      class="timer flex items-center justify-center gap-2 rounded-[10px] px-5 py-2 font-brawl text-2xl text-white tabular-nums"
      :class="[variant, { 'animate-pulse': frozen }]"
    >
      <span>{{ frozen ? '⏸️' : '⏱️' }}</span>
      <span>{{ seconds }}</span>
    </div>
  </div>
</template>

<style scoped>
.timer {
  border: 3px solid #0a1a55;
  box-shadow: 0 4px 0 rgba(10, 26, 85, 0.55);
  text-shadow: 0 2px 0 rgba(10, 26, 85, 0.5);
  transition: background 200ms ease;
}

.timer--normal {
  background: linear-gradient(180deg, #53ce17, #3aa00e);
}

.timer--urgent {
  background: linear-gradient(180deg, #ff5a3c, #d4321a);
}

.timer--frozen {
  background: linear-gradient(180deg, #00e5ff, #1474e0);
}
</style>
