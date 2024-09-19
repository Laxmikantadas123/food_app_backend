const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/catogory.Controller.js");
const auth = require("../middelwares/authMiddelware.js");
router.post("/creates", auth, createCategory);
router.get("/getAll", getAllCatController);
router.put("/update/:id", auth, updateCatController);
router.delete("/delete/:id", auth, deleteCatController);

module.exports = router;
