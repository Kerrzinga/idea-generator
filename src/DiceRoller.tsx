import { useCallback, useMemo, useRef, useState } from 'react'
import { getDailyWords } from './diceWords'
import DoubleWheel, { type DoubleWheelHandle } from './DoubleWheel'

const SPIN_LOCKOUT_MS = 4300

function DiceRoller() {
  const { adjectives, characters } = useMemo(() => getDailyWords(), [])
  const wheelRef = useRef<DoubleWheelHandle>(null)
  const [adjIndex, setAdjIndex] = useState<number | null>(null)
  const [charIndex, setCharIndex] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)

  const pullLever = useCallback(() => {
    if (busy) return
    setBusy(true)
    wheelRef.current?.spin()
    setTimeout(() => setBusy(false), SPIN_LOCKOUT_MS)
  }, [busy])

  const adjective = adjIndex !== null ? adjectives[adjIndex] : null
  const character = charIndex !== null ? characters[charIndex] : null

  return (
    <section className="dice-roller">
      <p className="dice-hint">Pull the lever to spin both rings for today's adjective + character combo.</p>

      <div className={`dice-result${adjective || character ? '' : ' placeholder'}`} aria-live="polite">
        {adjective || character ? (
          <span className="dice-result-text">{adjective ?? '?'} {character ?? '?'}</span>
        ) : (
          <span className="dice-result-text muted">Pull the lever to reveal today's combo</span>
        )}
      </div>

      <DoubleWheel
        ref={wheelRef}
        outerItems={adjectives}
        innerItems={characters}
        onOuterResult={setAdjIndex}
        onInnerResult={setCharIndex}
      />

      <button type="button" className="lever-btn" onClick={pullLever} disabled={busy}>
        🔓 Spin the Plot!
      </button>
    </section>
  )
}

export default DiceRoller
