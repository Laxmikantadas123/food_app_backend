const ApiError = require("../utils/ApiError");
const User=require("../models/user.model.js")
const admin = async (req, res, next) => {
 try {
    const user=await User.findById(req.body.id)
    if(user.usertype!=="admin"){
        throw ApiError(401,"Only Admin can Access")
    }else{
        next()
    }
 } catch (error) {
    throw ApiError(error.code,error.message)
 }
};

module.exports = admin;
