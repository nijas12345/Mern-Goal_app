const express = require('express')
const dotenv = require('dotenv').config()
const route = require('./routes/goalRoutes')
const userRoute = require('./routes/userRoute')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT ||  5000

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/goals',route)
app.use('/api/users',userRoute)
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})