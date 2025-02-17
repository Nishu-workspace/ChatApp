const userModel = require("../models/userModel")

async function checkEmail(request,response){
    try{
        const {email} = request.body
        const checkEmail = await  userModel.findOne({email}).select("-password") 
        console.log(checkEmail)
        if(!checkEmail){
            return response.status(400).json({
                message: "user not  exist",
                error : true
            })
        }
        return response.status(200).json({
            message: "email verify",
            success:true,
            data: checkEmail
        
        })

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true
        })

    }
}
module.exports = checkEmail