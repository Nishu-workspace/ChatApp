const bcryptjs = require('bcryptjs')
const userModel = require("../models/userModel")
const { model } = require('mongoose')

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

    const payload = {
        name,
        email,
        password : hashpassword,
        profile_pic,
        
    }

    const user  = new userModel(payload)
    const userSave = await user.save()
    return response.status(201).json({
        messaage: "User created successfully",
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