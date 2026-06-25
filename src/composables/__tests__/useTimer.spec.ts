import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTimer } from '../useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('counts down each second and fires onExpire at zero', () => {
    const timer = useTimer()
    const onExpire = vi.fn<() => void>()
    timer.start(3, onExpire)

    vi.advanceTimersByTime(3000)
    expect(timer.remaining.value).toBe(0)
    expect(timer.running.value).toBe(false)
    expect(onExpire).toHaveBeenCalledTimes(1)
  })

  it('freezes the countdown then resumes it', () => {
    const timer = useTimer()
    timer.start(10)

    vi.advanceTimersByTime(2000)
    expect(timer.remaining.value).toBe(8)

    timer.freeze(5000)
    expect(timer.frozen.value).toBe(true)
    // No ticking while frozen.
    vi.advanceTimersByTime(5000)
    expect(timer.remaining.value).toBe(8)
    expect(timer.frozen.value).toBe(false)

    // Resumes counting afterwards.
    vi.advanceTimersByTime(3000)
    expect(timer.remaining.value).toBe(5)
  })

  it('does not resume a freeze after the timer is stopped (game ended)', () => {
    const timer = useTimer()
    timer.start(10)

    timer.freeze(5000)
    timer.stop()
    expect(timer.frozen.value).toBe(false)

    vi.advanceTimersByTime(10000)
    // Stopped for good: no resumed ticking.
    expect(timer.remaining.value).toBe(10)
    expect(timer.running.value).toBe(false)
  })
})
