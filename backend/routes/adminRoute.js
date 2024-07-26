const express = require('express')
const adminRoute = express.Router()
const {loginAdmin,getUsers,editUser,userBlock,searchUser,registerUser} = require('../controllers/adminController')
const {protectAdmin} = require('../middleware/authMiddleware')

adminRoute.post('/login',loginAdmin)
adminRoute.get('/',getUsers)
adminRoute.post('/block',protectAdmin,userBlock)
adminRoute.put('/:userId',editUser)
adminRoute.post('/adduser',protectAdmin,registerUser)
adminRoute.post('/search',protectAdmin,searchUser)

module.exports = adminRoute