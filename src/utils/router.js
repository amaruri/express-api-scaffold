const express = require('express')
const validate = require('../routes/middlewares/validation')

class Router {
  constructor (path = '') {
    this.path = path
    this.routes = []
  }

  get (options = {}, callback) {
    const router = express.Router()

    const path = `${this.path}${options.path || ''}`

    router.get(path, async (req, res, next) => {
      try {
        await callback(req, res)
      } catch (error) {
        next(error)
      }
      next()
    })

    this.routes.push(router)
  }

  put (options = {}, callback) {
    const router = express.Router()

    const path = `${this.path}${options.path || ''}`

    router.put(path, async (req, res, next) => {
      const { validation } = options

      try {
        if (validation) {
          validate(req.body, validation)
        }
        await callback(req, res)
      } catch (error) {
        next(error)
      }
      next()
    })

    this.routes.push(router)
  }

  post (options = {}, callback) {
    const router = express.Router()

    const path = `${this.path}${options.path || ''}`

    router.post(path, async (req, res, next) => {
      const { validation } = options

      try {
        if (validation) {
          validate(req.body, validation)
        }
        await callback(req, res)
      } catch (error) {
        next(error)
      }
      next()
    })

    this.routes.push(router)
  }

  delete (options = {}, callback) {
    const router = express.Router()

    const path = `${this.path}${options.path || ''}`

    router.delete(path, async (req, res, next) => {
      try {
        await callback(req, res)
      } catch (error) {
        next(error)
      }
      next()
    })

    this.routes.push(router)
  }
}

module.exports = Router
