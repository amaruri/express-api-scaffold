const jwt = require('jsonwebtoken')

const jwtAuth = function (req, res, next) {
  if (!req.headers.authorization) return res.status(403).send({ message: 'No estás autenticado' })

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, process.env.TOKEN_SECRET)

  req.user = payload
  next()
}

module.exports = jwtAuth
