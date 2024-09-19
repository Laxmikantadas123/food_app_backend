const foodModals = require("../models/food.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const orderModel=require("../models/order.model.js")
const createFood = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    if (!title || !description || !price || !resturnat) {
      throw ApiError(500, "Please Provide all fields");
    }
    const newfood = new foodModals({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    });
    await newfood.save();
    res.json(ApiResponse(201, newfood, "New food item is created"));
  } catch (error) {
    throw ApiError(error.code, error.message);
  }
});

const getAllfood = asyncHandler(async (req, res) => {
  try {
    const food = await foodModals.find({});

    if (food.length === 0) {
      return res
        .status(404)
        .json(ApiResponse(404, null, "Food items not found"));
    }
    res
      .status(200)
      .json(ApiResponse(200, food, "Food items retrieved successfully"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(
        ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal server error"
        )
      );
  }
});
const getsingleFood = asyncHandler(async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      throw ApiError(404, "please provide Id");
    }
    const food = await foodModals.findById(foodId);
    if (!food) {
      throw ApiError(404, "Id is not found");
    }
    res.json(ApiResponse(200, food, "Food items retrieved successfully"));
  } catch (error) {
    throw ApiError(error.code, error.message);
  }
});

const getfoodbyresturent = asyncHandler(async (req, res) => {
  try {
    const resturentId = req.params.id;
    if (!resturentId) {
      throw ApiError(404, "please provide Id");
    }
    const food = await foodModals.find({ resturnat: resturentId });
    if (!food) {
      throw ApiError(404, "Id is not found");
    }
    res.json(ApiResponse(200, food, "Food items retrieved successfully"));
  } catch (error) {
    throw ApiError(error.code, error.message);
  }
});

const updatefood=asyncHandler(async (req,res)=>{
try {
    const foodId = req.params.id;
    if (!foodId) {
      throw ApiError(404, "please provide Id");
    }
    const {title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating}=req.body
        const updatedfood=await foodModals.findByIdAndUpdate(foodId,{
            title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating
        },{new:true})
        res.json(ApiResponse(200,updatedfood,"food is is upadted successfuly"))
} catch (error) {
    throw ApiError(error.code,error.message)
}
})

const deleteFoodController=asyncHandler(async (req,res)=>{
    try {
        const _id=req.params.id
        if(!_id){
            throw ApiError(404,"Id is not found")
        }
        const food=await foodModals.findByIdAndDelete({_id})
        res.json(ApiResponse(200,food,"food delete successfuly"))
    } catch (error) {
        throw ApiError(error.code,error.message)    
    }
})

const placeOrderController=asyncHandler(async (req,res)=>{
    try {
        const {cart,payment}=req.body
        if(!cart){
          throw ApiError(500,"please add cart")
        }
        let total=0
        cart.map((i)=>{
            total+=i.price 
        })
        const newOrder=new orderModel({
          foods:cart,
          payment:{total},
          buyer:req.body.id

        })
        await newOrder.save()
        res.json(ApiResponse(201,newOrder,"Order placed successfully"))
    } catch (error) {
        throw ApiError(error.code,error.message)
    }
})
const orderStatusController=asyncHandler(async (req,res)=>{
try {
  const orderId = req.params.id;
  if (!orderId) {
    throw ApiError(404,"Please Provide valid order id")
  }
  const { status } = req.body;
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  res.json(ApiResponse(200,order,"Order Status Updated"))
} catch (error) {
  throw ApiError(500,"Error in order status Api")
  
}
})
module.exports = {
  createFood,
  getAllfood,
  getsingleFood,
  getfoodbyresturent,
  updatefood,
  deleteFoodController,
  placeOrderController,
  orderStatusController

};
