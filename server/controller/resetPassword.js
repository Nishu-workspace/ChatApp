const userModel = require('../models/userModel')
const bcryptjs = require('bcryptjs')
async function resetPassword(request,response){
    try{
        const {email} = request.body
        const user = await userModel.findOne({email})
        const salt =await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(user.password,salt)

    }catch(error){

    }
}