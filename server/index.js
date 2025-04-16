const express = require('express')
const cors = require('cors')
// const app = express()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const  { app, server} = require('./socket/index')

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials : true
}))
console.log(process.env.FRONTEND_URL)
app.use(cookieParser())
app.use(express.json())
app.get('/',(req,res)=>{
    res.json({
        message: "Server is Running"
    })
})

//api  endpoints

app.use('/api',router)

const PORT = process.env.PORT || 8080 
connectDB().then(()=>{
    server.listen(PORT, ()=>{
        console.log("Server running at " + PORT)
    })
})
