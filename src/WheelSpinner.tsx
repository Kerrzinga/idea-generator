import { useCallback, useState } from 'react'
import { spinWheelExcluding } from './diceWords'

const SEGMENT_ANGLE = 360 / 12
const SEGMENT_COLORS = ['#6366f1', '#818cf8']
const SPIN_DURATION_MS = 4000

function angleForIndex(index: number) {
  return index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
}

interface WheelSpinnerProps {
  items: string[]
  onResult: (index: number) => void
}

function WheelSpinner({ items, onResult }: WheelSpinnerProps) {
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
      <button type="button" className="btn btn-primary" onClick={spin} disabled={spinning}>
        🎡 Spin the wheel
      </button>
    </div>
  )
}

export default WheelSpinner
