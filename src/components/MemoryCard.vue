<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '@/types'

const props = defineProps<{ card: Card }>()
const emit = defineEmits<{ flip: [] }>()

/** The face is visible when flipped up or temporarily peeked. */
const revealed = computed(() => props.card.faceUp || props.card.peeking)

function onClick() {
  // Peeked cards can't be clicked; neither can already-resolved ones.
  if (props.card.peeking || props.card.faceUp || props.card.matched || props.card.removed) return
  emit('flip')
}
</script>

<template>
  <button
    type="button"
    class="card"
    :class="{
      'is-up': revealed,
      'is-peeking': card.peeking,
      'is-matched': card.matched,
      'is-removed': card.removed,
    }"
    :aria-label="revealed ? card.emoji : 'Hidden card'"
    @click="onClick"
  >
    <span class="card-inner">
      <span class="card-face card-back" aria-hidden="true">?</span>
      <span class="card-face card-front">{{ card.emoji }}</span>
    </span>
  </button>
</template>

<style scoped>
.card {
  aspect-ratio: 5 / 6;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  perspective: 800px;
  /* Enlarge + fade on match. */
  transition:
    transform 400ms ease,
    opacity 400ms ease;
}

.card-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  /* Y-axis flip. */
  transition: transform 500ms;
}

.card.is-up .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 3px solid #0a1a55;
  backface-visibility: hidden;
}

.card-back {
  background: linear-gradient(180deg, #ff8c00, #d46a00);
  color: rgb(255 255 255 / 0.3);
  font-family: 'Bungee', cursive;
  font-size: clamp(1.25rem, 6vw, 1.75rem);
  box-shadow: 0 4px 0 rgba(10, 26, 85, 0.55);
}

.card-front {
  background: linear-gradient(180deg, #ffffff, #f0f0f5);
  border-color: #00e5ff;
  font-size: clamp(1.5rem, 8vw, 2.5rem);
  line-height: 1;
  transform: rotateY(180deg);
  box-shadow:
    0 4px 0 rgba(10, 26, 85, 0.35),
    0 0 14px 2px rgb(0 229 255 / 0.4);
}

/* A peeked card glows yellow so the temporary reveal reads as a power, not a flip. */
.card.is-peeking .card-front {
  border-color: #facc15;
  box-shadow:
    0 0 0 3px #facc15,
    0 0 16px 3px rgb(250 204 21 / 0.75);
}

.card.is-matched {
  transform: scale(1.2);
  opacity: 0;
}

.card.is-removed {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
</style>
