import { useState, useCallback } from 'react'
import { IDEAS, CATEGORIES, getRandomIdea, type Category, type Idea } from './ideas'
import DiceRoller from './DiceRoller'
import './App.css'

const CATEGORY_EMOJI: Record<Category, string> = {
  Technology: '💻',
  Creative: '🎨',
  Business: '💼',
  Lifestyle: '🌿',
  'Social Good': '🤝',
  Learning: '📚',
}

type Filter = Category | 'All'
type View = 'dice' | 'ideas'

function App() {
  const [view, setView] = useState<View>('dice')
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [idea, setIdea] = useState<Idea>(() => getRandomIdea(IDEAS))
  const [copied, setCopied] = useState(false)
  const [animating, setAnimating] = useState(false)

  const filteredIdeas = activeFilter === 'All'
    ? IDEAS
    : IDEAS.filter((i) => i.category === activeFilter)

  const generate = useCallback(() => {
    setAnimating(true)
    setTimeout(() => {
      setIdea(getRandomIdea(filteredIdeas))
      setAnimating(false)
    }, 180)
  }, [filteredIdeas])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(idea.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available — silently ignore
    }
  }, [idea.text])

  const handleFilterChange = (filter: Filter) => {
    setActiveFilter(filter)
    // Regenerate with new filter immediately
    const next = filter === 'All' ? IDEAS : IDEAS.filter((i) => i.category === filter)
    setIdea(getRandomIdea(next))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span className="header-emoji">{view === 'dice' ? '🎲' : '💡'}</span>
          {view === 'dice' ? 'Word Dice' : 'Idea Generator'}
        </h1>
        <p className="tagline">
          {view === 'dice'
            ? "Roll two dice for today's adjective + character combo."
            : 'Spark your next project, adventure, or skill.'}
        </p>
      </header>

      <nav className="view-tabs" aria-label="Choose a tool">
        <button
          type="button"
          className={`view-tab${view === 'dice' ? ' active' : ''}`}
          onClick={() => setView('dice')}
        >
          🎲 Word Dice
        </button>
        <button
          type="button"
          className={`view-tab${view === 'ideas' ? ' active' : ''}`}
          onClick={() => setView('ideas')}
        >
          💡 Idea Generator
        </button>
      </nav>

      <main className="main">
        {view === 'dice' ? (
          <DiceRoller />
        ) : (
          <>
            {/* Category filter */}
            <nav className="filter-bar" aria-label="Filter ideas by category">
              <button
                type="button"
                className={`filter-btn${activeFilter === 'All' ? ' active' : ''}`}
                onClick={() => handleFilterChange('All')}
              >
                ✨ All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
                  onClick={() => handleFilterChange(cat)}
                >
                  {CATEGORY_EMOJI[cat]} {cat}
                </button>
              ))}
            </nav>

            {/* Idea card */}
            <section className={`idea-card${animating ? ' fade-out' : ''}`} aria-live="polite">
              <span className="idea-category">
                {CATEGORY_EMOJI[idea.category]} {idea.category}
              </span>
              <p className="idea-text">{idea.text}</p>
            </section>

            {/* Actions */}
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={generate}>
                🎲 Generate idea
              </button>
              <button
                type="button"
                className={`btn btn-secondary${copied ? ' copied' : ''}`}
                onClick={handleCopy}
                aria-label="Copy idea to clipboard"
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>

            <p className="count-hint">
              {filteredIdeas.length} idea{filteredIdeas.length !== 1 ? 's' : ''} in{' '}
              <strong>{activeFilter === 'All' ? 'all categories' : activeFilter}</strong>
            </p>
          </>
        )}
      </main>

      <footer className="footer">
        <p>
          Built with React &amp; TypeScript · {' '}
          <a
            href="https://github.com/Kerrzinga/idea-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
