import express from 'express'

const app = express()
const PORT = 8000

// Use static server to serve the Express Yourself Website
app.use(express.static('public'))

app.get('/expressions', (req, res, next) => {
  const monsters = [{ type: 'Oni' }, { type: 'Hedgehog' }]
  res.send(monsters)
  console.log(`Get ${req.url}`)
})

app.get('/expressions/:id', (req, res, next) => {
  console.log(req.params)
  res.send('Oh! it is dynamic!')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
