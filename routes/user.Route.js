const express = require("express");
const router = express.Router();
const {
  userRegisterPost,
  userLoginPost,
} = require("../controllers/user.Controller.js");


router.post("/register",userRegisterPost);

router.post("/login",userLoginPost);
module.exports = router;
