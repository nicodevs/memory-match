<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'secondary' }>(), { variant: 'primary' })
</script>

<template>
  <button
    type="button"
    class="brawl-btn px-10 py-3 text-lg"
    :class="variant === 'primary' ? 'brawl-btn--green' : 'brawl-btn--blue'"
  >
    <slot />
  </button>
</template>
