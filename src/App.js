import React, { useState } from 'react'

import processText from './text-processor'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [sentences, setSentences] = useState({})
  const findSimilarSentences = async () => {
    const similarSentences = await processText(text)
    setSentences(similarSentences)
  }

  return (
    <div className="container">
      <div className="sub-container">
        <textarea className="editor" value={text} onChange={event => setText(event.target.value)} />
        <button className="btn" onClick={findSimilarSentences}>Click me!</button>
        {Object.entries(sentences).map(
          ([sentence, similarSentences], i) => (
            <div key={i} className="sentences">
              <strong>"{sentence}"</strong> is similar to:
              <ul>
                {similarSentences.map((similarSentence, i) => (
                  <li key={i}>{similarSentence}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
