import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { wrongAnswerTexts } from '../data/wrongAnswerTexts.js'

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function AnswerOverlay({ panel, onClose }) {
  const [guess, setGuess] = useState('')
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0)

  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()

    if (normalize(guess) === normalize(panel.answer)) {
      navigate(panel.path)
      return
    }

    setWrongAnswerCount((current) => current + 1)
  }

  const wrongAnswerIndex =
    (wrongAnswerCount - 1) % wrongAnswerTexts.length

  return (
    <div
      className="answer-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="answer-question"
    >
      <button
        type="button"
        className="answer-backdrop"
        onClick={onClose}
        aria-label="Close"
      />

      <form className="answer-card" onSubmit={handleSubmit}>
        <p id="answer-question">{panel.question}</p>

        <label className="answer-label" htmlFor="panel-answer">
          Your answer
        </label>

        <input
          id="panel-answer"
          ref={inputRef}
          className="answer-input"
          type="text"
          value={guess}
          autoComplete="off"
          onChange={(event) => setGuess(event.target.value)}
        />

        {wrongAnswerCount > 0 ? (
          <p className="answer-wrong" role="status">
            {wrongAnswerTexts[wrongAnswerIndex].title}
          </p>
        ) : null}

        <button className="answer-submit" type="submit">
          Check
        </button>
      </form>
    </div>
  )
}

export default AnswerOverlay