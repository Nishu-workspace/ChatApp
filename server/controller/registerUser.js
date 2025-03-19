const bcryptjs = require('bcryptjs')
const userModel = require("../models/userModel")
const { model } = require('mongoose')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
async function registerUser(request, response){
try{

    const {name,email,profile_pic,password} = request.body
    console.log('Received data:', { name, email, password, profile_pic });

    const checkEmail = await userModel.findOne({email}) //{name,email} //null

    if(checkEmail){
        return response.status(400).json({
            message: "email Already exist",
            error: true,
        })
    }

    //password into hash password
    const salt =await bcryptjs.genSalt(10)
    const hashpassword = await bcryptjs.hash(password,salt)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 *60*1000);
        const payload = {
        name,
        email,
        password : hashpassword,
        profile_pic,
        isVerified : false,
        otp,
        otpExpires,
        
        
    }

    const user  = new userModel(payload)
    const userSave = await user.save()

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
    
        secure: false,
        auth:{
            type: 'login',
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    console.log(email)
    await transporter.sendMail({
        from: '"Support Team" suppor.chatapp@zohomail.in',
        to: email,
        subject: "Verfiy your  Email - OTP",
        text:`Your OTP for email verification is: ${otp}`
    })
    return response.status(201).json({
        message: "OTP   sent to email, verify your email",
        data : userSave,
        success: true
    })
} catch(error){
    return response.status(500).json({
        message: error.message || error,
        error: true
    })
}
}
module.exports = registerUser;