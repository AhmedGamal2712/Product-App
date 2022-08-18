

const jsonwebtoken = require('jsonwebtoken')
const user_model = require('../DB/Models/User_Model')

const auth = () => {
  return async (req, res, next) => {
    const headerToken = req.headers['authorization']
    try {
      // console.log(headerToken == null)
      // console.log(headerToken == undefined)
      // console.log(headerToken.startsWith('Bearer '))
      if (
        headerToken == null ||
        headerToken == undefined ||
        !headerToken.startsWith('Bearer ')
      ) {
        res.json({ message: 'in-valid header token' })
      } else {
        console.log(typeof(headerToken))
        const token = headerToken.split(" ")[1]
        if (!token || token == undefined || token.length < 1) {
          res.json({ message: 'in-valid token' })
        } else {
          const decoded = jsonwebtoken.verify(token, process.env.HASH_KEY)
          const findUser = await user_model
            .findById(decoded.id)
          if (!findUser) {
            res.json({ message: 'in-valid token user' })
          } else {
            req.user = findUser
            next()
          }
        }
      }
    } catch (error) {
      console.log(error)
      res.json({ message: 'catch error', error })
    }
  }
}

module.exports = {
  auth
}
