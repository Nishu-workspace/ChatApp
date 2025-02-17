const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const userModel = require("../models/userModel")

async function updateUserDetails(request,response){
    try{
        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = request.body
        const updateUser = await UserModel.updateOne({
            _id:user._id,
            name,
            profile_pic
        })
        const userInformation  =  await userModel.findById(user._id)
        return response.json({
            message : userInformation,
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