import express from 'express'

import {
  getElementById,
  getIndexById,
  createElement,
  updateElement,
  seedElements,
} from './utils'

const app = express()
const PORT = 8000

// Use static server to serve the Express Yourself Website
app.use(express.static('public'))

const expressions = []
seedElements(expressions, 'animals')

app.get('/expressions', (req, res, next) => {
  res.send(expressions)
  console.log(`Get ${req.url}`)
})

app.get('/expressions/:id', (req, res, next) => {
  if (isNaN(Number(req.params.id))) {
    res.status(404).send('not found')
    return
  }
  res.send('Oh! it is dynamic!')
})

app.put('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions)
  if (expressionIndex === -1) {
    res.status(404).send()
    return
  }
  // use like `\?name=hoge\&emoji=someEmoji` to throw query using `curl` PUT method
  updateElement(req.params.id, req.query, expressions)
  res.send(expressions[expressionIndex])
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
