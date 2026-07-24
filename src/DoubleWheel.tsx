import { forwardRef, useCallback, useImperativeHandle, useState, type Dispatch, type SetStateAction } from 'react'
import { spinWheelExcluding } from './diceWords'

const OUTER_SIZE = 260
const INNER_SIZE = 156
const OUTER_COLORS: [string, string] = ['#caa244', '#8a6a2c']
const INNER_COLORS: [string, string] = ['#1f8a94', '#0e4f57']
const OUTER_SPIN_MS = 4200
const INNER_SPIN_MS = 3200

function segmentAngle(count: number) {
  return 360 / count
}

function angleForIndex(index: number, count: number) {
  return index * segmentAngle(count) + segmentAngle(count) / 2
}

export interface DoubleWheelHandle {
  spin: () => void
}

interface DoubleWheelProps {
  outerItems: string[]
  innerItems: string[]
  onOuterResult: (index: number) => void
  onInnerResult: (index: number) => void
}

interface RingState {
  rotation: number
  spinning: boolean
  lastIndex: number | null
}

const DoubleWheel = forwardRef<DoubleWheelHandle, DoubleWheelProps>(function DoubleWheel(
  { outerItems, innerItems, onOuterResult, onInnerResult },
  ref,
) {
  const [outer, setOuter] = useState<RingState>({ rotation: 0, spinning: false, lastIndex: null })
  const [inner, setInner] = useState<RingState>({ rotation: 0, spinning: false, lastIndex: null })

  const spinRing = useCallback(
    (
      state: RingState,
      setState: Dispatch<SetStateAction<RingState>>,
      items: string[],
      onResult: (index: number) => void,
      durationMs: number,
    ) => {
      if (state.spinning) return
      const nextIndex = spinWheelExcluding(state.lastIndex, items.length)
      const targetAngle = (360 - angleForIndex(nextIndex, items.length) + 360) % 360
      const currentEffective = ((state.rotation % 360) + 360) % 360
      const delta = (targetAngle - currentEffective + 360) % 360
      const extraSpins = 4 + Math.floor(Math.random() * 3)
      const nextRotation = state.rotation + extraSpins * 360 + delta
      setState({ rotation: nextRotation, spinning: true, lastIndex: state.lastIndex })
      window.setTimeout(() => {
        setState({ rotation: nextRotation, spinning: false, lastIndex: nextIndex })
        onResult(nextIndex)
      }, durationMs)
    },
    [],
  )

  const spin = useCallback(() => {
    spinRing(outer, setOuter, outerItems, onOuterResult, OUTER_SPIN_MS)
    spinRing(inner, setInner, innerItems, onInnerResult, INNER_SPIN_MS)
  }, [inner, innerItems, onInnerResult, outer, outerItems, onOuterResult, spinRing])

  useImperativeHandle(ref, () => ({ spin }), [spin])

  const outerGradient = `conic-gradient(${outerItems
    .map((_, i) => `${OUTER_COLORS[i % 2]} ${i * segmentAngle(outerItems.length)}deg ${(i + 1) * segmentAngle(outerItems.length)}deg`)
    .join(', ')})`
  const innerGradient = `conic-gradient(${innerItems
    .map((_, i) => `${INNER_COLORS[i % 2]} ${i * segmentAngle(innerItems.length)}deg ${(i + 1) * segmentAngle(innerItems.length)}deg`)
    .join(', ')})`

  return (
    <div className="double-wheel" style={{ width: OUTER_SIZE, height: OUTER_SIZE }}>
      <div className="wheel-pointer" aria-hidden="true" />
      <div
        className="wheel-ring wheel-ring-outer"
        style={{
          width: OUTER_SIZE,
          height: OUTER_SIZE,
          background: outerGradient,
          transform: `rotate(${outer.rotation}deg)`,
          transitionDuration: `${OUTER_SPIN_MS}ms`,
        }}
      />
      <div
        className="wheel-ring wheel-ring-inner"
        style={{
          width: INNER_SIZE,
          height: INNER_SIZE,
          left: (OUTER_SIZE - INNER_SIZE) / 2,
          top: (OUTER_SIZE - INNER_SIZE) / 2,
          background: innerGradient,
          transform: `rotate(${inner.rotation}deg)`,
          transitionDuration: `${INNER_SPIN_MS}ms`,
        }}
      />
      <div className="wheel-hub" aria-hidden="true">
        🔒
      </div>
    </div>
  )
})

export default DoubleWheel
