const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        throw ApiError(404, "Un-Authorize request");
      } else {
        // console.log(decoded);
        req.body.id = decoded.id;
        // const date = new Date(decoded.iat * 1000);
        // console.log(`Token createAt : ${date}`);
        next();
      }
    });
  } catch (err) {
    throw ApiError(err.code, err.message);
  }
};

module.exports = auth;
