const { hashSync } = require('bcrypt')
const { Schema, model } = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const findOneOrCreate = require('./plugins/findOneOrCreate')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  }
}, {
  timestamps: true
})

UserSchema.plugin(mongooseDelete, { overrideMethods: ['find', 'findOne'] })
UserSchema.plugin(findOneOrCreate)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashPassword = hashSync(this.password, Number(process.env.SALT_ROUNDS))
    this.password = hashPassword
  }
  next()
})

const User = model('User', UserSchema)

module.exports = User
