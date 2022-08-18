const joi = require('joi')
module.exports = {
  add_pro_schema: {
    body: joi
      .object()
      .required()
      .keys({
        title: joi
          .string()
          .required()
          .messages({
            'any.required': 'oops , you must enter a title',
            'string.empty': 'oops , title cannot be empty',
            'string.base': 'oops , title must be sent in string'
          }),
        desc: joi
          .string()
          .required()
          .messages({
            'any.required': 'oops , you must enter a title',
            'string.empty': 'oops , title cannot be empty',
            'string.base': 'oops , title must be sent in string'
          }),
        price: joi
          .number()
          .required()
          .messages({
            'any.required': 'oops , you must enter a title',
            'string.empty': 'oops , title cannot be empty',
            'number.base': 'oops , title must be sent in string'
          })
      })
  },
  update_Schema: {
    body: joi
      .object()
      .required()
      .keys({
        title: joi.string(),
        desc: joi.string(),
        price: joi.number()
      }),
    params: joi
      .object()
      .required()
      .keys({
        _id: joi.string().required()
      })
  }
}
