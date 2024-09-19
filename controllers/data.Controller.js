const User=require("../models/user.model.js")
const ApiError=require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");


const getUser=asyncHandler(async (req,res)=>{
    try{
       const user=await User.findById({_id:req.body.id},{_id:0,password:0})
       if(!user){
        throw ApiError(404,"User not found")
       }
       res.json(ApiResponse(200,user))
    }catch(err){
         throw ApiError(err.code,err.message)
    }

})


const updateUser=asyncHandler(async (req,res)=>{
  try {
    const user=await User.findById({_id:req.body.id})
    if(!user){
        throw ApiError(404,"User Not Found")
    }
    const {username,email,phone,address}=req.body
     if(username) user.username=username
     if(email) user.email=email
     if(phone) user.username=phone
     if(address) user.address=address
      await user.save()
     res.json(ApiResponse(200,user,"successfuly user profile updated"))
    
  } catch (error) {
    throw ApiError(error.code,error.message)
  }
})


// ---------------------------resetPassword---------------------

const resetPassword=asyncHandler(async (req,res)=>{
  try{
    const {email,newpassword}=req.body
    if(!email){
        throw ApiError(404,"Provide the email")
    }
    const newheshPass = await bcrypt.hash(newpassword, 10);
    const user=await User.findById({_id:req.body.id})
    if(newpassword) user.password=newheshPass
    await user.save()
    res.json(ApiResponse(200,"Password reset successfuly"))
  }catch(error){
    throw ApiError(error.code,error.message)
  }
    

})
const userDelete=asyncHandler(async (req,res)=>{
  try {
    const userDeleted=await User.findByIdAndDelete(req.params.id);
    res.json(ApiResponse(200,userDeleted,"Your Account has been deleted"))
  } catch (error) {
    throw ApiError(error.code,error.message)
  }
})

module.exports= {
    getUser,
    updateUser,
    resetPassword,
    userDelete
}


