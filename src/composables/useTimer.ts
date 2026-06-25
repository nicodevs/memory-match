import { onScopeDispose, ref } from 'vue'

/**
 * A second-resolution countdown.
 *
 * `start` (re)begins the count from `seconds`; `stop` freezes it in place,
 * keeping the current `remaining` value. When the count reaches 0 it stops and
 * invokes the expiry callback once.
 */
export function useTimer() {
  const remaining = ref(0)
  const running = ref(false)
  let handle: ReturnType<typeof setInterval> | undefined

  function clear() {
    if (handle !== undefined) {
      clearInterval(handle)
      handle = undefined
    }
  }

  /** Freeze the countdown where it is. */
  function stop() {
    running.value = false
    clear()
  }

  function start(seconds: number, onExpire?: () => void) {
    clear()
    remaining.value = seconds
    running.value = true
    handle = setInterval(() => {
      remaining.value--
      if (remaining.value <= 0) {
        remaining.value = 0
        stop()
        onExpire?.()
      }
    }, 1000)
  }

  onScopeDispose(clear)

  return { remaining, running, start, stop }
}
