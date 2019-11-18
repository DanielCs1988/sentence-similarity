import * as toxicity from '@tensorflow-models/toxicity'

const THRESHOLD = 0.5

// https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/47140708#47140708
function strip(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

async function analyzeToxicity(sentences) {
  const model = await toxicity.load(THRESHOLD)
  const predictions = await model.classify(sentences)

  const data = {}
  sentences.forEach(sentence => data[sentence] = [])

  predictions.forEach(({ label, results }) => {
    results.forEach(({ match }, index) => {
      if (match) {
        data[sentences[index]].push(label)
      }
    })
  })

  return data
}

async function processText(html) {
  const text = strip(html)
  const sentences = text
    .match(/[^.!?]+[.!?]+/g)
    .map(sentence => sentence.trim())

  return analyzeToxicity(sentences)
}

export default processText
