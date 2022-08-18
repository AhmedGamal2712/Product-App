const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.PORT
const {connectionDB} = require("./DB/connection")
const User_Router = require("./modules/User/Use.Router")
const Product_Router = require('./modules/Produts/Products.Router')
const Auth_Router = require("./modules/Auth/Auth.Router")

app.use(express.json())


app.use(User_Router , Product_Router , Auth_Router)

connectionDB()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))