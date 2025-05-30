const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const userModel = require("../models/userModel")

async function updateUserDetails(request,response){
    try{
        const token = request.cookies.token || ""
        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic, language } = request.body
        const updateUser = await userModel.updateOne({
            _id:user._id},{
            name,
            profile_pic,
        
        language}
        )
        const userInformation  =  await userModel.findById(user._id)
        return response.json({
            message : "Edited successfully",
            data:userInformation,
            success : true
        })
    }
    catch(error){
        return response.status(500).json({
            message: error.message || error,
            error : true

        })
    }
}
module.exports =  updateUserDetails