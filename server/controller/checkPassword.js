const userModel = require("../models/userModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
async function checkPassword(request, response) {
    try {
        console.log("Received request body:", request.body);
            const {password, userId} = request.body
            console.log(userId)
            const user = await userModel.findById(userId)
            // if (!user) {
            //     return response.status(400).json({
            //         message: "User not found",
            //         error: true
            //     });
            // }
            const verifyPassword = await bcryptjs.compare(password, user.password)
        if(!verifyPassword){
            return response.status(400).json({
                message:"Please check the paassword",
                error:true
            })
        }
        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = await  jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn: '1d'})
        const cookieOption = {
            httpOnly: true,
            secure : true,
            sameSite:"None",
            maxAge: 7*24*60*60*1000
        }

        return response.cookie('token',token,cookieOption).status(200).json({
            message: "login succesfully",
            token : token,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true
        })
    }
}
module.exports = checkPassword
