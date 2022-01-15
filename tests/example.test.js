require('dotenv').config({ path: `${process.cwd()}/.env.test` })
const mongo = require('../db')
const UserController = require('../src/controllers/UserController')

describe('Logic Business', () => {
  let db
  beforeAll(async () => {
    db = await mongo.init()
  })

  afterAll(async () => {
    for (const model of Object.keys(db.models)) {
      await db.models[model].deleteMany({})
    }
    db.connection.close()
  })

  describe('User', () => {
    test('User', async () => {
      const payload = { email: 'test@test.com' }
      const user = await UserController.create(payload)
      expect(user).toHaveProperty('email', payload.email)
    })
  })
})
