const mongoose = require('mongoose')
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        const con = mongoose.connection
        con.on('connected',()=>{
            console.log("Connect to DB")
        })
        con.on('error', (error)=>{
            console.log("Something is wrong in mongodb", error)
        })
    } catch (err){
        console.log("Something is wrong", err)
    }
}
module.exports = connectDB