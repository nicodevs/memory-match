<script setup lang="ts">
import { computed } from 'vue'
import type { PowerDef } from '@/types'

const props = defineProps<{ power: PowerDef; owned: boolean; coins: number }>()
const emit = defineEmits<{ buy: [] }>()

const affordable = computed(() => props.coins >= props.power.price)

/** Consumables note that they're spent for good, mirroring the design copy. */
const description = computed(() =>
  props.power.kind === 'consumable'
    ? `${props.power.description.replace(/\.$/, '')} (single use).`
    : props.power.description,
)
</script>

<template>
  <div class="shop-card flex flex-col items-center gap-2 rounded-[14px] px-2.5 py-3 text-center">
    <div class="flex h-16 items-center justify-center text-4xl leading-none">{{ power.icon }}</div>
    <h3 class="title font-brawl text-base text-black">{{ power.name.toUpperCase() }}</h3>
    <p class="flex-1 font-body text-[15px] leading-snug font-bold text-black/85">{{ description }}</p>

    <button
      v-if="owned"
      type="button"
      disabled
      class="shop-btn shop-btn--owned font-brawl text-base text-brawl-dim"
    >
      OWNED
    </button>
    <button
      v-else-if="affordable"
      type="button"
      class="shop-btn shop-btn--buy font-brawl text-base text-white tabular-nums"
      :aria-label="`Buy ${power.name} for ${power.price} coins`"
      @click="emit('buy')"
    >
      💰 {{ power.price }}
    </button>
    <button
      v-else
      type="button"
      disabled
      class="shop-btn shop-btn--locked font-brawl text-base text-white/80 tabular-nums"
      :aria-label="`${power.name} locked, costs ${power.price} coins`"
    >
      🔒 {{ power.price }}
    </button>
  </div>
</template>

<style scoped>
.shop-card {
  background: radial-gradient(120% 120% at 50% 20%, #ffffff 0%, #fac602 40%, #ff8c00 100%);
  border: 3px solid #0a1a55;
  box-shadow: 0 4px 0 rgba(10, 26, 85, 0.6);
}

.title {
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.7);
}

.shop-btn {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 10px;
  border: 3px solid;
  text-shadow: 0 2px 0 rgba(10, 26, 85, 0.5);
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.25);
  transition:
    transform 80ms ease,
    box-shadow 80ms ease,
    filter 120ms ease;
}

.shop-btn--buy {
  background: linear-gradient(180deg, #53ce17, #2a8c08);
  border-color: #1b5e20;
}

.shop-btn--buy:hover {
  filter: brightness(1.08);
}

.shop-btn--buy:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
}

.shop-btn--owned {
  background: linear-gradient(180deg, #4a5fc1, #303f9f);
  border-color: #1a237e;
  cursor: default;
}

.shop-btn--locked {
  background: linear-gradient(180deg, #4a5fc1, #303f9f);
  border-color: #1a237e;
  cursor: not-allowed;
  filter: grayscale(0.2);
}
</style>
