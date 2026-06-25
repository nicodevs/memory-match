<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from './screens/MainMenu.vue'
import GameScreen from './screens/GameScreen.vue'

type Screen = 'menu' | 'game'

const screen = ref<Screen>('menu')
</script>

<template>
  <MainMenu v-if="screen === 'menu'" @play="screen = 'game'" />
  <GameScreen v-else @close="screen = 'menu'" />
</template>
