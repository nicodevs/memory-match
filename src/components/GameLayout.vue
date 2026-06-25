<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <div class="brawl-bg flex h-dvh flex-col text-white">
    <header class="flex shrink-0 items-center justify-between px-4 pt-3.5 pb-1.5">
      <slot name="header" />
    </header>

    <main class="flex flex-1 items-center justify-center overflow-auto px-4 py-2">
      <slot />
    </main>

    <footer
      v-if="slots.footer"
      class="flex shrink-0 items-center justify-center px-4 pb-3"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>
