<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import OverlayScreen from '@/components/OverlayScreen.vue'

const emit = defineEmits<{ retry: []; menu: [] }>()
</script>

<template>
  <OverlayScreen emoji="🤬" title="GAME OVER">
    <BaseButton class="w-full" @click="emit('retry')">TRY AGAIN</BaseButton>
    <BaseButton class="w-full" variant="secondary" @click="emit('menu')">MAIN MENU</BaseButton>
  </OverlayScreen>
</template>
