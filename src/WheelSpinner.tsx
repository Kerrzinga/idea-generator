import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { spinWheelExcluding } from './diceWords'

const SEGMENT_ANGLE = 360 / 12
const SEGMENT_COLORS = ['#ff6b35', '#3d1a54']
const SPIN_DURATION_MS = 4000

function angleForIndex(index: number) {
  return index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
}

export interface WheelSpinnerHandle {
  spin: () => void
}

interface WheelSpinnerProps {
  items: string[]
  onResult: (index: number) => void
}

const WheelSpinner = forwardRef<WheelSpinnerHandle, WheelSpinnerProps>(function WheelSpinner(
  { items, onResult },
  ref,
) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [lastIndex, setLastIndex] = useState<number | null>(null)

  const spin = useCallback(() => {
    if (spinning) return
    const nextIndex = spinWheelExcluding(lastIndex, items.length)
    const targetAngle = (360 - angleForIndex(nextIndex) + 360) % 360
    const currentEffective = ((rotation % 360) + 360) % 360
    const delta = (targetAngle - currentEffective + 360) % 360
    const extraSpins = 4 + Math.floor(Math.random() * 3)
    setSpinning(true)
    setRotation(rotation + extraSpins * 360 + delta)
    window.setTimeout(() => {
      setSpinning(false)
      setLastIndex(nextIndex)
      onResult(nextIndex)
    }, SPIN_DURATION_MS)
  }, [items.length, lastIndex, onResult, rotation, spinning])

  useImperativeHandle(ref, () => ({ spin }), [spin])

  const gradient = `conic-gradient(${items
    .map((_, i) => `${SEGMENT_COLORS[i % 2]} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`)
    .join(', ')})`

  return (
    <div className="wheel-spinner">
      <div className="wheel-pointer" aria-hidden="true" />
      <div
        className="wheel"
        style={{ background: gradient, transform: `rotate(${rotation}deg)`, transitionDuration: `${SPIN_DURATION_MS}ms` }}
      >
        {items.map((item, i) => (
          <div key={item} className="wheel-slice-label" style={{ transform: `rotate(${angleForIndex(i)}deg)` }}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

export default WheelSpinner
