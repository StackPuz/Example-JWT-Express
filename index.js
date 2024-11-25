const express = require('express')
const jwt = require('jsonwebtoken')
const jwtSecret = require('./config').jwt_secret
const authenticate = require('./middleware/authenticate')

let app = express()
app.use(express.json(), express.static('public'), authenticate)

app.get('/user', (req, res) => {
  res.send({
    name: req.user.name,
  })
})

app.post('/login', (req, res) => {
  if (req.body.name == 'admin' && req.body.password == '1234') {
    let token = jwt.sign({ id: 1, name: 'admin' }, jwtSecret, { expiresIn: '1d' })
    return res.send({ token })
  }
  res.status(400).send()
})

app.listen(8000)