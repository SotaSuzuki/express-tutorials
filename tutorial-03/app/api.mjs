/**
 * end point
 * ---
 * /todos - get 一覧取得
 * /todos - post 新規作成
 * /todos/:id - get 取得
 * /todos/:id - put 更新
 * /todos/:id - delete 削除
 * ---
 */

import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser' // リクエストの body 部分 を読み取る

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

const jsonFilePath = 'data/todos.json'

const defaultJSON = {
  todos: []
}

const Todo = function () {
  this.id = 0,
  this.text = ''
  this.complete = false
}

const checkJSONExists = () => {
  return new Promise(resolve => {
    fs.access(jsonFilePath, (err) => {
      if (err) {
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

const writeJSON = (json) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(jsonFilePath, JSON.stringify(json), (err) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      resolve(json)
    })
  })
}

const readJSON = () => {
  return new Promise(resolve => {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) {
        resolve(defaultJSON)
        console.error('not found')
        return
      }
      console.log(data)
      resolve(JSON.parse(data))
    })
  })
}

const getTodoList = () => {
  return new Promise(resolve => {
    checkJSONExists().then((exists) => {
      if (!exists) {
        resolve(defaultJSON)
        return
        // mkdir && create file
      }
      return readJSON()
    }).then((json) => {
      resolve(json)
    })
  })
}

// app.route('/todos/:id')
//   .get((req, res) => {
//     onRouteGetTodo(req, res)
//   })
//   .put((req, res) => {
//     onRoutePutTodo(req, res)
//   })
//   .delete((req, res) => {
//     onRouteDeleteTodo(req, res)
//   })

app.post('/todos', (req, res) => {
  const body = req.body
  console.log('body', body)
  const todo = new Todo()
  if (!body.text || body.text.length <= 0) {
    console.log('.text', 400) // TODO: need to change to BadStatus
    return
  }
  todo.text = body.text
  if (!body.hasOwnProperty('complete') || (body.complete !== 'true' || body.complete !== 'false')) {
    console.log('.complete', 400)
    return
  }
  dodo.complete = body.complete === 'true'
  getTodoList().then((json) => {
    json.todos.push(todo)
    return writeJSON(json)
  }).then((json) => {
    res.json(json)
  })
})

app.get('/todos', (req, res) => {
  getTodoList().then((obj) => {
    res.json(obj)
  })
})

app.listen(8001, () => {
  console.log('Todo app API listening on port 8001')
})
