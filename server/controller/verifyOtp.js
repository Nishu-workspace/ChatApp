const UserModel = require('../models/userModel')

async function verfiyOtp(req,res) {
    try{
        const {email, otp} = req.body
        const user = await UserModel.findOne({email});

        if(!user){

            return res.status(400).json({message: "User not found!", error:true});
        }
        if(user.isVerified){
            return res.status(400).json({message: "User is already verified", error:true})
        }
        if(user.otp !== otp || user.otpExpires < Date.now()){
            return res.status(400).json({message: "Invalid or expired OTP", error:true})
        }
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.status(200).json({
            message: "Email verified succesfully! You can now login.",
            success: true
        });
    }
    catch(error){
        return res.status(500).json({
            message : error.message || error,
            error: true
        })
    }
}

module.exports = verfiyOtp