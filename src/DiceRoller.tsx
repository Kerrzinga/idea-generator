import { useCallback, useMemo, useState } from 'react'
import { getDailyWords, rollTwoDiceExcluding } from './diceWords'
import WheelSpinner from './WheelSpinner'

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

function DiceRoller() {
  const { adjectives, characters } = useMemo(() => getDailyWords(), [])
  const [die1, setDie1] = useState(1)
  const [die2, setDie2] = useState(1)
  const [adjIndex, setAdjIndex] = useState<number | null>(null)
  const [charIndex, setCharIndex] = useState<number | null>(null)
  const [rolling, setRolling] = useState(false)

  const rollDice = useCallback(() => {
    setRolling(true)
    setTimeout(() => {
      const { die1: d1, die2: d2, index } = rollTwoDiceExcluding(adjIndex)
      setDie1(d1)
      setDie2(d2)
      setAdjIndex(index)
      setRolling(false)
    }, 400)
  }, [adjIndex])

  const adjective = adjIndex !== null ? adjectives[adjIndex] : null
  const character = charIndex !== null ? characters[charIndex] : null

  return (
    <section className="dice-roller">
      <p className="dice-hint">
        Today's word lists refresh once a day. Roll the dice for an adjective, spin the wheel for a character.
      </p>

      <div className={`dice-result${adjective || character ? '' : ' placeholder'}`} aria-live="polite">
        {adjective || character ? (
          <span className="dice-result-text">{adjective ?? '?'} {character ?? '?'}</span>
        ) : (
          <span className="dice-result-text muted">Roll and spin to reveal today's combo</span>
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
          <button type="button" className="btn btn-primary" onClick={rollDice} disabled={rolling}>
            🎲 Roll the dice
          </button>
        </div>

        <div className="combo-block">
          <h3 className="section-title">🎡 Character</h3>
          <WheelSpinner items={characters} onResult={setCharIndex} />
        </div>
      </div>

      <details className="dice-lists">
        <summary>Today's word lists</summary>
        <div className="dice-lists-grid">
          <div>
            <h3>Adjectives</h3>
            <ol>
              {adjectives.map((word, i) => (
                <li key={word}>{i + 1}. {word}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3>Characters</h3>
            <ol>
              {characters.map((word, i) => (
                <li key={word}>{i + 1}. {word}</li>
              ))}
            </ol>
          </div>
        </div>
      </details>
    </section>
  )
}

export default DiceRoller
