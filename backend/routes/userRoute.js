const express = require('express')
const userRoute = express.Router()
const {registerUser,loginUser,getMe,editUser, profileUpload} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

userRoute.post('/',registerUser)
userRoute.post('/login',loginUser)
userRoute.post('/me',protect,getMe)
userRoute.put('/:userId',editUser)
userRoute.post('/profile/upload',protect,profileUpload)

module.exports = userRoute