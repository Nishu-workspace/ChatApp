const userModel = require('../models/userModel')
const bcryptjs = require('bcryptjs')
async function resetPassword(request,response){
    try{
        const {email,password,otp} = request.body
        const user = await userModel.findOne({email});

        if(!user){

            return response.status(400).json({message: "User not found!", error:true});
        }
        if(user.otp !== otp || user.otpExpires < Date.now()){
            return response.status(400).json({message: "Invalid or expired OTP", error:true})
        }
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        const salt =await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)
        const updatedUser = await userModel.updateOne({email:email},{
            password:hashpassword
        })
        return response.status(200).json({
            message: "Password updated succesfully",success:true
            
        })
    }catch(error){
        console.error(error)
        return response.status(500).json({ message: "Internal Server Error", error: true })
    }
}
module.exports = resetPassword;