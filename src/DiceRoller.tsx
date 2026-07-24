import { useCallback, useMemo, useRef, useState } from 'react'
import { getDailyWords, rollTwoDiceExcluding } from './diceWords'
import WheelSpinner, { type WheelSpinnerHandle } from './WheelSpinner'

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
const WHEEL_SPIN_MS = 4000

function DiceRoller() {
  const { adjectives, characters } = useMemo(() => getDailyWords(), [])
  const wheelRef = useRef<WheelSpinnerHandle>(null)
  const [die1, setDie1] = useState(1)
  const [die2, setDie2] = useState(1)
  const [adjIndex, setAdjIndex] = useState<number | null>(null)
  const [charIndex, setCharIndex] = useState<number | null>(null)
  const [rolling, setRolling] = useState(false)
  const [busy, setBusy] = useState(false)

  const pullLever = useCallback(() => {
    if (busy) return
    setBusy(true)
    setRolling(true)
    setTimeout(() => {
      const { die1: d1, die2: d2, index } = rollTwoDiceExcluding(adjIndex)
      setDie1(d1)
      setDie2(d2)
      setAdjIndex(index)
      setRolling(false)
    }, 400)
    wheelRef.current?.spin()
    setTimeout(() => setBusy(false), WHEEL_SPIN_MS)
  }, [adjIndex, busy])

  const adjective = adjIndex !== null ? adjectives[adjIndex] : null
  const character = charIndex !== null ? characters[charIndex] : null

  return (
    <section className="dice-roller">
      <p className="dice-hint">Pull the lever to lock in today's adjective + character combo.</p>

      <div className={`dice-result${adjective || character ? '' : ' placeholder'}`} aria-live="polite">
        {adjective || character ? (
          <span className="dice-result-text">{adjective ?? '?'} {character ?? '?'}</span>
        ) : (
          <span className="dice-result-text muted">Pull the lever to reveal today's combo</span>
        )}
      </div>

      <div className="combo-columns">
        <div className="combo-block">
          <h3 className="section-title">🎲 Adjective</h3>
          <div className="dice-row">
            <div className={`die${rolling ? ' rolling' : ''}`} aria-label={`Die one showing ${die1}`}>
              {DICE_FACES[die1 - 1]}
            </div>
            <div className={`die${rolling ? ' rolling' : ''}`} aria-label={`Die two showing ${die2}`}>
              {DICE_FACES[die2 - 1]}
            </div>
          </div>
        </div>

        <div className="combo-block">
          <h3 className="section-title">🎡 Character</h3>
          <WheelSpinner ref={wheelRef} items={characters} onResult={setCharIndex} />
        </div>
      </div>

      <button type="button" className="lever-btn" onClick={pullLever} disabled={busy}>
        🎰 Pull the Lever
      </button>
    </section>
  )
}

export default DiceRoller
