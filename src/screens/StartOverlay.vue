<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import OverlayScreen from '@/components/OverlayScreen.vue'

defineProps<{ level: number }>()
const emit = defineEmits<{ start: []; menu: [] }>()
</script>

<template>
  <!-- Begin the level only once the fast fade-out has finished. -->
  <OverlayScreen v-slot="{ dismiss }" emoji="🚀" :title="`LEVEL ${level}`" @faded="emit('start')">
    <BaseButton class="w-full" @click="dismiss">START</BaseButton>
    <BaseButton v-if="level > 1" class="w-full" variant="secondary" @click="emit('menu')">
      MAIN MENU
    </BaseButton>
  </OverlayScreen>
</template>
