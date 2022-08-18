const joi = require('joi')

module.exports = {
  Sign_up_schema: {
    body: joi
      .object()
      .required()
      .keys({
        name: joi
          .string()
          .required()
          .messages({
            'any.required': 'oops , ypu must send name',
            'string.empty': 'oops , name cannot be empty',
            'string.base': 'oops , name must be string'
          }),
        email: joi
          .string()
          .email()
          .required()
          .messages({
            'any.required': 'oops , you must send your email',
            'string.empty': 'oops , email cannot be empty',
            'string.base': 'oops , email must be string'
          }),
        password: joi
          .string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required()
          .messages({
            'any.required': 'oops , you must send your password',
            'string.empty': 'oops , password cannot be empty',
            'string.base': 'oops , password must be sent in string'
          }),
        cpassword: joi
          .string()
          .required()
          .valid(joi.ref('password'))
          .messages({
            'any.required': 'oops! cpassword is required',
            'any.only': 'opps cpassword must match password',
            'string.empty': 'oops this field connot be empty',
            'string.base': 'oops , this field must be string'
          }),
        phone: joi
          .number()
          .required()
          .messages({
            'any.required': 'oops! phone is required',
            'string.empty': 'oops this field connot be empty',
            'number.base': 'oops , this field must be numbers only'
          })
      })
  },
  sign_In_Schema: {
    body: joi
      .object()
      .required()
      .keys({
        email: joi
          .string()
          .email()
          .required()
          .messages({
            'any.required': 'oops , you must send your email',
            'string.empty': 'oops , email cannot be empty',
            'string.base': 'oops , email must be string'
          }),
        password: joi
          .string()
          .required()
          .messages({
            'any.required': 'oops , you must send your password',
            'string.empty': 'oops , password cannot be empty',
            'string.base': 'oops , password must be sent in string'
          })
      })
  }
}
