<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import IconButton from '@/components/IconButton.vue'
import ShopPowerCard from '@/components/ShopPowerCard.vue'
import type { PowerDef } from '@/types'

defineProps<{
  entries: { def: PowerDef; owned: boolean }[]
  coins: number
}>()
const emit = defineEmits<{ buy: [id: string]; continue: []; close: [] }>()
</script>

<template>
  <div class="brawl-bg fixed inset-0 z-10 flex flex-col text-white">
    <header class="flex shrink-0 items-center justify-between px-4 pt-3.5 pb-2">
      <IconButton aria-label="Back to menu" @click="emit('close')">✕</IconButton>
      <span class="brawl-pill-dark rounded-[10px] px-7 py-2 font-brawl text-lg text-white">SHOP</span>
      <span
        class="brawl-pill-gold flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 font-brawl text-base text-black tabular-nums"
      >
        💰 {{ coins }}
      </span>
    </header>

    <div class="h-1 shrink-0 bg-black/40" />

    <main class="flex-1 overflow-auto px-3.5 py-4">
      <div class="mx-auto grid w-full max-w-3xl grid-cols-2 gap-2.5 lg:grid-cols-3">
        <ShopPowerCard
          v-for="entry in entries"
          :key="entry.def.id"
          :power="entry.def"
          :owned="entry.owned"
          :coins="coins"
          @buy="emit('buy', entry.def.id)"
        />
      </div>
    </main>

    <div class="h-1 shrink-0 bg-black/40" />

    <footer class="flex shrink-0 items-center justify-center px-4 py-4">
      <BaseButton @click="emit('continue')">CONTINUE</BaseButton>
    </footer>
  </div>
</template>
