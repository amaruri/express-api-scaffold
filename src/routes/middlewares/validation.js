const Joi = require('joi')

const validate = function (data, validation) {
  try {
    Joi.assert(
      data,
      validation,
      {
        allowUnknown: true
      }
    )
  } catch (error) {
    let err = error
    if (((err || {}).details || []).length) {
      err = error.details[0]
    }
    throw err
  }
}

module.exports = validate
