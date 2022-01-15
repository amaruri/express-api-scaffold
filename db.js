const mongoose = require('mongoose')
const mongoUri = `${process.env.MONGO_URI}/${process.env.DB}`
const colors = require('colors')

async function init () {
  mongoose.set('debug', process.env.DEBUG === 'true' || false)
  await mongoose.connect(mongoUri)
  return mongoose
}

mongoose.connection.on('connected', () => {
  console.log(colors.cyan('[RESERVATIONS API]'), colors.green(`Conectado correctamente a: ${mongoUri}`))
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.warn(colors.cyan('[RESERVATIONS API]'), colors.yellow('Conexión cerrada por el usuario'))
    process.exit(0)
  })
})

mongoose.connection.on('error', function (e) {
  console.error(colors.cyan('[RESERVATIONS API]'), colors.red(e))
})

module.exports = { init }
