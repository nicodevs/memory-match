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
  aspect-ratio: 1 / 1;
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
  border-radius: 0.75rem;
  backface-visibility: hidden;
}

.card-back {
  background: linear-gradient(145deg, #fb923c, #ea580c);
  color: rgb(255 255 255 / 0.45);
  font-size: clamp(1.5rem, 7vw, 2.5rem);
  font-weight: 800;
}

.card-front {
  background: #f8fafc;
  font-size: clamp(1.75rem, 9vw, 3rem);
  line-height: 1;
  transform: rotateY(180deg);
}

/* A peeked card glows yellow so the temporary reveal reads as a power, not a flip. */
.card.is-peeking .card-front {
  box-shadow:
    0 0 0 3px #facc15,
    0 0 16px 2px rgb(250 204 21 / 0.7);
}

.card.is-matched {
  transform: scale(1.25);
  opacity: 0;
}

.card.is-removed {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
</style>
