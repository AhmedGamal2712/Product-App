const joi = require('joi')

module.exports = {
  update_schema: {
    body: joi
      .object()
      .required()
      .keys({
        name: joi.string(),
        email: joi.string().email(),
        phone: joi.number()
      })
  }
}
