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
  <div class="fixed inset-0 z-10 flex flex-col bg-slate-900 text-white">
    <header class="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
      <IconButton aria-label="Back to menu" @click="emit('close')">✕</IconButton>
      <h1 class="text-xl font-bold tracking-wide">SHOP</h1>
      <span
        class="flex items-center gap-1 rounded-full bg-white/10 px-3 py-2 text-sm font-bold tabular-nums"
      >
        💰 {{ coins }}
      </span>
    </header>

    <main class="flex-1 overflow-auto p-4">
      <div class="mx-auto grid w-full max-w-3xl grid-cols-2 gap-3 lg:grid-cols-3">
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

    <footer class="flex h-20 shrink-0 items-center justify-center border-t border-white/10 px-4">
      <BaseButton @click="emit('continue')">CONTINUE</BaseButton>
    </footer>
  </div>
</template>
