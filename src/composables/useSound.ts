import { ref } from 'vue'

/**
 * Sound on/off state. Playback itself is an upcoming feature — for now this
 * just backs the header toggle button.
 */
export function useSound() {
  const enabled = ref(true)

  function toggle() {
    enabled.value = !enabled.value
  }

  return { enabled, toggle }
}
