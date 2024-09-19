const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  resetPassword,
  userDelete,
} = require("../controllers/data.Controller.js");
const auth = require("../middelwares/authMiddelware.js");

router.route("/getuser").get(auth, getUser);
router.route("/updateprofile").put(auth, updateUser);
router.route("/resetpassword").put(auth, resetPassword);
router.route("/delete/:id").delete(auth, userDelete);
module.exports = router;
