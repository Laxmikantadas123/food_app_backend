const mongoose=require("mongoose")


const connectDB=async (res,req)=>{
   try{
    await mongoose.connect("mongodb://localhost:27017/userDatabase")
    console.log("Database is connected");
    
   }catch(error){
    console.log("Database showing sowe error", error);
   }
}
module.exports=connectDB