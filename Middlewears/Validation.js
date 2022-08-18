const { StatusCodes } = require("http-status-codes")

const Req_Schemas = ['body', 'params', 'query']

const validation = schema => {
  return (req, res, next) => {
    const validationErrors = []
    Req_Schemas.forEach(key => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], { abortEarly:false})
        if (validationResult.error) {
          const Error_Message = validationResult.error.details
          validationErrors.push(Error_Message)
          console.log(validationErrors)
        }
      }
    })
    if (validationErrors.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'validation error', Validation_Errors: validationErrors })
    }
    next()
  }
}

module.exports = validation
