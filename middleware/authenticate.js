const jwt = require('jsonwebtoken')
const jwtSecret = require('../config').jwt_secret

module.exports = (req, res, next) => {
  if (req.originalUrl == '/login') {
    next()
  }
  else {
    let header = req.headers['authorization']
    if (!header || !header.startsWith('Bearer ')) {
      return res.sendStatus(401)
    }
    else {
      let token = header.substr(7)
      jwt.verify(token, jwtSecret, (error, user) => {
        if (error) {
          return res.sendStatus(401)
        }
        req.user = user
        next()
      })
    }
  }
}