require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./db')
const helmet = require('helmet')
const port = process.env.PORT
const routes = require('./src/routes')
const colors = require('colors')
const errorHandler = require('./src/middlewares/errorHandler')

app.listen(port, async () => {
  await db.init()
  console.log(
    colors.cyan('[RESERVATIONS-API]'),
    colors.green(`Api lista en http://localhost:${port}`)
  )
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(routes)
app.use(errorHandler)
