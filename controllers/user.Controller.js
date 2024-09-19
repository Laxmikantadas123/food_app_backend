const User = require("../models/user.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRegisterPost = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password || !phone || !address) {
      throw ApiError(400, "All fields are required");
    }
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      throw ApiError(400, "User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      phone,
      address,
    });
    res.render("signup")
    // res
    //   .status(201)
    //   .json(ApiResponse(201, user, "User registered successfully"));
  } catch (err) {
    throw ApiError(err.code, err.message);
  }
});
// ---------------------------------login-----------------------
const userLoginPost = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    if (!(email || phone) || !password) {
      throw ApiError(400, "Fill the all fields for login");
    }
    const existingLogin = await User.findOne(
      {
        $or: [{ phone }, { email }]
      }

    );
    // console.log(existingLogin);

    if (!existingLogin) {
      throw ApiError(404, "User not found");
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingLogin.password
    );
    if (!isPasswordMatch) {
      throw Error(400, "Password is not match");
    }
    //---------------------token----------
    const jwttoken = await jwt.sign(
      { id: existingLogin._id },
      process.env.SECRET_KEY
    );
    console.log(jwttoken);
    existingLogin.password = undefined;
    res.json(ApiResponse(200, existingLogin, "Login successfull", jwttoken));
  } catch (err) {
    throw ApiError(err.code, err.message);
  }
});

module.exports = {
  userRegisterPost,
  userLoginPost,
};
