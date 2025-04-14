const userModel = require("../models/userModel")
const { model } = require('mongoose')
const nodemailer = require('nodemailer')
async function sendOtp(request, response) {
    try{
        console.log("request", request.body)
        const {email}
 = request.body
 console.log("Received data",email)
 const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 *60*1000);
    const checkEmail = await userModel.findOne({email}) //{name,email} //null

    if(checkEmail){
        if(!checkEmail.isVerified){
        return response.status(400).json({
            message: "User is not verified yet",
            error: true,
        })}
       const data = await userModel.updateOne({email:email},{
            otp:otp,
            otpExpires:otpExpires
        })
        const transporter = nodemailer.createTransport({
                    service:"Gmail",
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                
                    secure: true,
                    auth:{
                        type: 'login',
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                })
                console.log(email)
                await transporter.sendMail({
                    from: '"Support Team" howworld188@gmail.com',
                    to: email,
                    subject: `Verfiy your  Email - ${otp}`,
                    html:`<h1>Welcome to Chat App</h1>
                    <span style="padding: 5px; margin:2px; border: solid 1px #7E25C6; background-color:#E6C8FF "> ${otp[0]} </span> 
                    <span style="padding: 5px; margin:2px; border: solid 1px #7E25C6; background-color:#E6C8FF"> ${otp[1]} </span> 
                    <span style="padding: 5px; margin:2px; border: solid 1px #7E25C6; background-color:#E6C8FF"> ${otp[2]} </span> 
                    <span style="padding: 5px; margin:2px; border: solid 1px #7E25C6; background-color:#E6C8FF"> ${otp[3]} </span> 
                    <span style="padding: 5px; margin:2px; border: solid 1px #7E25C6; background-color:#E6C8FF"> ${otp[4]} </span> 
                    <span style="padding: 5px; margin:2px; border: solid 1px #7E25C6; background-color:#E6C8FF"> ${otp[5]} </span>
                    `
                })
        return response.status(201).json({
            message: "OTP   sent to email, verify your email",
            data : data,
            success: true
        })
    }
    }catch(error)
{
    return response.status(500).json({
        message: error.message || error,
        error: true
    })
}
}
module.exports = sendOtp;