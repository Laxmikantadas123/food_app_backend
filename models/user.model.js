const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
      type:String,
      required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,"phone is required"]
    },
    usertype:{
        type:String,
        // required:[true,"user type is required"],
        enum:['client','admin','vendor','driver'],
        default:"client",
        
    }
},{timestamps:true})




const User=mongoose.model("user",userSchema)
module.exports=User