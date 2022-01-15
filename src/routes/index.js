const express = require('express')
const router = express.Router()
const logger = require('morgan')
const requireAuth = require('./middlewares/jwt-auth')
const auth = require('./auth')
const v1 = require('./v1')

router.use(logger('tiny'))
router.use('', auth)
router.use('/v1', requireAuth, v1)

module.exports = router
