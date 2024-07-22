const express = require('express')
const userRoute = express.Router()
const {registerUser,loginUser,getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

userRoute.post('/',registerUser)
userRoute.post('/login',loginUser)
userRoute.post('/me',protect,getMe)

module.exports = userRoute