<script setup lang="ts">
import { computed } from 'vue'
import type { PowerDef } from '@/types'

const props = defineProps<{ power: PowerDef; owned: boolean; coins: number }>()
const emit = defineEmits<{ buy: [] }>()

const affordable = computed(() => props.coins >= props.power.price)
</script>

<template>
  <div
    class="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
  >
    <div class="text-4xl leading-none">{{ power.icon }}</div>
    <h3 class="font-bold tracking-wide">{{ power.name }}</h3>
    <p class="flex-1 text-xs text-white/60">{{ power.description }}</p>

    <button
      v-if="owned"
      type="button"
      disabled
      class="w-full rounded-full bg-white/10 px-4 py-2 text-sm font-bold tracking-wide text-white/40"
    >
      OWNED
    </button>
    <button
      v-else-if="affordable"
      type="button"
      class="w-full rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold tracking-wide text-white tabular-nums transition hover:bg-emerald-400 active:scale-95"
      :aria-label="`Buy ${power.name} for ${power.price} coins`"
      @click="emit('buy')"
    >
      💰 {{ power.price }}
    </button>
    <button
      v-else
      type="button"
      disabled
      class="w-full rounded-full bg-white/10 px-4 py-2 text-sm font-bold tracking-wide text-white/40 tabular-nums"
      :aria-label="`${power.name} locked, costs ${power.price} coins`"
    >
      🔒 {{ power.price }}
    </button>
  </div>
</template>
