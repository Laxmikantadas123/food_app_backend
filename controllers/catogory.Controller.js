const categoryModel = require("../models/catagory.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      throw ApiError(400, "please provide category title");
    }
    const newCategory = new categoryModel({
      title,
      imageUrl,
    });
    await newCategory.save();
    res.json(ApiResponse(201, newCategory, "New Category Added"));
  } catch (error) {
    throw ApiError(error.code, error.message);
  }
});
const getAllCatController = asyncHandler(async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      throw ApiError(404, "categories not found");
    }
    res.json(ApiResponse(200, categories, "Get categories"));
  } catch (error) {
    throw ApiError(error.code, error.message);
  }
});
const updateCatController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(id,{ title, imageUrl },{ new: true });
    if(!updatedCategory){
        throw ApiError(404,"No Category Found")
    }
    res.json(ApiResponse(200,updatedCategory,"Category Updated Successfully"))
  } catch (error) {
    throw ApiError(error.code, error.message);
  }
});

const  deleteCatController=asyncHandler(async (req,res)=>{
    try {
        const _id= req.params.id;
        const deleteCategorise=await categoryModel.findByIdAndDelete({_id})
        if(!deleteCategorise){
            throw ApiError(404,"No Category Found")
        }
        res.json(ApiResponse(200,deleteCategorise,"Category delete successfuly"))
    } catch (error) {
        throw ApiError(error.code,error.message)
        
    }
})

module.exports = {
  createCategory,
  getAllCatController,
  updateCatController,
  deleteCatController
};
