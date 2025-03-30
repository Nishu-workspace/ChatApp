const userModel = require('../models/userModel')
const bcryptjs = require('bcryptjs')
async function resetPassword(request,response){
    try{
        const {email,password} = request.body
       
        const salt =await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)
        const updatedUser = await userModel.updateOne({email:email},{
            password:hashpassword
        })
        return response.status(200).json({
            message: "Password updated succesfully"
            
        })
    }catch(error){

    }
}