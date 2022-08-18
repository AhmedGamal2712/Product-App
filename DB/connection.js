const mongoose = require('mongoose')

exports.connectionDB = () => {
  return mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(re => console.log('DB connected'))
    .catch(err => console.log('DB connection fail'))
}
