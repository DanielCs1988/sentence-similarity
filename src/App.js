import React, { useState } from 'react'
import ReactQuill from 'react-quill'

import processText from './text-processor'
import 'react-quill/dist/quill.snow.css'
import './App.css'

function App() {
  const [text, setText] = useState('')

  return (
    <div className="container">
      <div className="sub-container">
        <ReactQuill className="editor" value={text} onChange={setText} />
        <button className="btn" onClick={async () => {
          const data = await processText(text)
          Object.entries(data).forEach(([ key, value ]) => {
            if (value.length > 0) {
              setText(prevText => prevText.replace(key, `<u>${key}</u>`))
            }
          })
        }}>Click me!</button>
      </div>
    </div>
  )
}

export default App
