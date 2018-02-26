// import http from 'http'
//
// http.createServer((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/plain'
//   })
//   res.end('Hello, world!\n')
// }).listen(8000)
//
// console.log('Server running at http://127.0.0.1:8000')

import express from 'express'

var app = express()

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/hoge/', (req, res) => {
  res.send('hoge hoge')
})

var server = app.listen(8000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
