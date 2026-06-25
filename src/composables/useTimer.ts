import { onScopeDispose, ref } from 'vue'

/**
 * A second-resolution countdown.
 *
 * `start` (re)begins the count from `seconds`; `stop` freezes it in place,
 * keeping the current `remaining` value. When the count reaches 0 it stops and
 * invokes the expiry callback once. `freeze` pauses the countdown for a while
 * and then resumes it (used by the Time Stop power).
 */
export function useTimer() {
  const remaining = ref(0)
  const running = ref(false)
  /** True while a Time Stop freeze is suspending the countdown. */
  const frozen = ref(false)
  let tickHandle: ReturnType<typeof setInterval> | undefined
  let freezeHandle: ReturnType<typeof setTimeout> | undefined
  let onExpire: (() => void) | undefined

  function clearTick() {
    if (tickHandle !== undefined) {
      clearInterval(tickHandle)
      tickHandle = undefined
    }
  }

  function clearFreeze() {
    if (freezeHandle !== undefined) {
      clearTimeout(freezeHandle)
      freezeHandle = undefined
    }
  }

  function tick() {
    tickHandle = setInterval(() => {
      remaining.value--
      if (remaining.value <= 0) {
        remaining.value = 0
        stop()
        onExpire?.()
      }
    }, 1000)
  }

  /** Freeze the countdown where it is, cancelling any active freeze. */
  function stop() {
    running.value = false
    frozen.value = false
    clearTick()
    clearFreeze()
  }

  function start(seconds: number, expire?: () => void) {
    clearTick()
    clearFreeze()
    remaining.value = seconds
    running.value = true
    frozen.value = false
    onExpire = expire
    tick()
  }

  /**
   * Suspend the countdown for `ms`, then resume it — unless the game has ended
   * in the meantime (`stop` clears the pending resume). A no-op if the timer
   * isn't running or is already frozen.
   */
  function freeze(ms: number) {
    if (!running.value || frozen.value) return
    frozen.value = true
    clearTick()
    freezeHandle = setTimeout(() => {
      clearFreeze()
      frozen.value = false
      if (running.value) tick()
    }, ms)
  }

  onScopeDispose(() => {
    clearTick()
    clearFreeze()
  })

  return { remaining, running, frozen, start, stop, freeze }
}
