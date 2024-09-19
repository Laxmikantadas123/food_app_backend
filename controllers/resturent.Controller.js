const resturentModel = require("../models/resturent.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createResturentController = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if(!title||!coords){
        throw ApiError(500,"Provide the title and address")
    }
    const d=new Date()
    const newResturent=new resturentModel({
        title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    })
    await newResturent.save()
    res.json(ApiResponse(201,newResturent,"Resturent created successfuly"))
  } catch (error) {
    throw ApiError(error.code,error.message);
  }
});

const getById=asyncHandler(async (req,res)=>{
      try {
        const resturentId=req.params.id
   
        
        if(!resturentId){
            throw ApiError(400,"provide resturent id ")
        }
        const resturents=await resturentModel.findById(resturentId)
      
        
        if(!resturents){
            throw ApiError(404,"Resturent not found")
        }
        res.json(200,resturents)
      } catch (error) {
        throw ApiError(error.code,error.message)
      }
})
const deleteResturent=asyncHandler(async (req,res)=>{
    try {
        const resId=req.params.id
        if(!resId){
            throw ApiError(404,"Resturent is not found")
        }
        const resDelete=await resturentModel.findByIdAndDelete(resId)
        res.json(ApiResponse(200,resDelete,"Resturent is successfuly deleted"))
    } catch (error) {
        throw ApiError(error.code,error.message)
    }
})
module.exports = {
  createResturentController,
  getById,
  deleteResturent
};
