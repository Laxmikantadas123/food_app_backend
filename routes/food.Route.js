const express = require("express");
const router = express.Router();
const auth=require("../middelwares/authMiddelware")
const admin=require("../middelwares/adminMiddelware.js")
const {
  createFood,
  getAllfood,
  getsingleFood,
  getfoodbyresturent,
  updatefood,
  deleteFoodController,
  placeOrderController,
  orderStatusController
} = require("../controllers/food.Controller.js");
router.post("/createfood", auth, createFood);
router.get("/getallfood", getAllfood);
router.get("/getfoodbyid/:id", auth, getsingleFood);
router.get("/getfoodbyresturent/:id", auth, getfoodbyresturent);
router.put("/updatefood/:id", auth, updatefood);
router.delete("/delete/:id", auth, deleteFoodController);
router.post("/placeorder",auth,placeOrderController)
router.post("/orderStatus/:id",auth,admin,orderStatusController)
module.exports = router;
