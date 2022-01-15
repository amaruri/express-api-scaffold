const { compareSync } = require('bcrypt')
const { notFound } = require('@hapi/boom')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const UserController = {
  model: User,

  generateToken: function (user) {
    const payload = {
      email: user.email,
      password: user.password,
      _id: user._id
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1 day' })
  },

  verifyToken: function (token) {
    return jwt.verify(token, process.env.TOKEN_SECRET)
  },

  signIn: async function (body) {
    const user = await this.model.findOne({ email: body.email })

    if (!user) throw notFound('No existe el usuario')

    if (!compareSync(body.password, user.password)) throw notFound('Usuario o conraseña incorrectos')

    const jwt = this.generateToken(user)

    return { user, jwt }
  },

  setPassword: async function (query, payload) {
    const user = await this.model.findOne(query)
    await user.set({ password: payload.password }).save()
    return user
  },

  create: async function (payload) {
    const user = await this.model.create(payload)

    return user
  }
}

module.exports = UserController
