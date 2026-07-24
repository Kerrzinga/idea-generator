import { useCallback, useMemo, useState } from 'react'
import { getDailyWords, rollDie } from './diceWords'

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

function DiceRoller() {
  const { adjectives, characters } = useMemo(() => getDailyWords(), [])
  const [adjDie, setAdjDie] = useState(1)
  const [charDie, setCharDie] = useState(1)
  const [rolling, setRolling] = useState(false)
  const [hasRolled, setHasRolled] = useState(false)

  const roll = useCallback(() => {
    setRolling(true)
    setTimeout(() => {
      setAdjDie(rollDie())
      setCharDie(rollDie())
      setRolling(false)
      setHasRolled(true)
    }, 400)
  }, [])

  const adjective = adjectives[adjDie - 1]
  const character = characters[charDie - 1]

  return (
    <section className="dice-roller">
      <p className="dice-hint">
        Today's word lists refresh once a day. Roll to pair one adjective with one character.
      </p>

      <div className="dice-row">
        <div className={`die${rolling ? ' rolling' : ''}`} aria-label={`Adjective die showing ${adjDie}`}>
          {DICE_FACES[adjDie - 1]}
        </div>
        <div className={`die${rolling ? ' rolling' : ''}`} aria-label={`Character die showing ${charDie}`}>
          {DICE_FACES[charDie - 1]}
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={roll} disabled={rolling}>
        🎲 Roll the dice
      </button>

      <div className={`dice-result${hasRolled ? '' : ' placeholder'}`} aria-live="polite">
        {hasRolled ? (
          <span className="dice-result-text">{adjective} {character}</span>
        ) : (
          <span className="dice-result-text muted">Roll to reveal today's combo</span>
        )}
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
