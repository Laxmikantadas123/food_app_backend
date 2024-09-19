const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authMiddelware.js");
const {
  createResturentController,
  getById,
  deleteResturent,
} = require("../controllers/resturent.Controller.js");

router.post("/create", auth, createResturentController);
router.get("/getbyid/:id", getById);
router.delete("/deleteresturent/:id", auth, deleteResturent);

module.exports = router;
