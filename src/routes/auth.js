const Joi = require('joi')
const UserController = require('../controllers/UserController')
const Router = require('../utils/router')

const router = new Router('')

router.post(
  {
    path: '/signup',
    validation: Joi.object({
      email: Joi.string().email()
    })
  },
  async (req, res) => {
    const { body } = req

    const user = await UserController.create(body)
    res.send(user)
  }
)

router.post(
  {
    path: '/signin',
    validation: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },
  async (req, res) => {
    const { body } = req
    const response = await UserController.signIn(body)

    res.send(response)
  }
)

router.post(
  {
    path: '/set-password/:id'
  },
  async (req, res) => {
    const { body } = req
    const { id } = req.params

    const user = await UserController.setPassword({ _id: id }, body)

    res.send(user)
  }
)

module.exports = router.routes
