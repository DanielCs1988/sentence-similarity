import * as use from '@tensorflow-models/universal-sentence-encoder'
const sim = require('compute-cosine-similarity')

const SIMILARITY_THRESHOLD = 0.7

async function analyzeSimilarity(sentences) {
  const model = await use.load()
  const embeddings = await Promise.all(sentences.map(sentence => model.embed(sentence)))
  const vectors = await Promise.all(embeddings.map(embedding => embedding.data()))

  return compareVectors(vectors, sentences)
}

function compareVectors(vectors, sentences) {
  const data = {}

  for (let i = 0; i < vectors.length; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      const currentVector = vectors[i]
      const vectorComparedTo = vectors[j]
      const vectorSimilarity = sim([...currentVector], [...vectorComparedTo])

      if (vectorSimilarity >= SIMILARITY_THRESHOLD) {
        const currentSentence = sentences[i]
        const sentenceComparedTo = sentences[j]
        registerSimilarSentence(data, currentSentence, sentenceComparedTo)
      }
    }
  }

  return data
}

function registerSimilarSentence(data, currentSentence, sentenceComparedTo) {
  if (data[currentSentence] === undefined) {
    data[currentSentence] = [ sentenceComparedTo ]
  } else {
    data[currentSentence].push(sentenceComparedTo)
  }
}

async function processText(text) {
  const sentences = text
    .match(/[^.!?]+[.!?]+/g)
    .map(sentence => sentence.trim())

  return analyzeSimilarity(sentences)
}

export default processText
