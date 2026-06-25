<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'secondary' }>(), { variant: 'primary' })
</script>

<template>
  <button
    type="button"
    class="rounded-full px-10 py-3 text-lg font-bold tracking-wide transition active:scale-95"
    :class="
      variant === 'primary'
        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-400'
        : 'bg-white/10 text-white hover:bg-white/20'
    "
  >
    <slot />
  </button>
</template>
