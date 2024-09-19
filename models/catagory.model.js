const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);


const Categorymodel= mongoose.model("category", categorySchema);
module.exports=Categorymodel