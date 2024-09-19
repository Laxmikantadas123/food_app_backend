const express=require("express")
// const colors=require("colors")
const cors=require("cors")
const path=require("path")
const userRouter=require("./routes/user.Route.js")
const getUserRouter=require("./routes/data.Route.js")
const resturent=require("./routes/resturent.Route.js")
const category=require("./routes/catogory.Route.js")
const foodRoute=require("./routes/food.Route.js")
const morgan=require("morgan")
const connectDB=require("./db/index.js")
const dotenv=require("dotenv")
dotenv.config()
connectDB()
const port=process.env.PORT||3000

const app=express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//-------------router part------------


app.use("/",userRouter)
app.use("/user",getUserRouter)
app.use("/resturent",resturent)
app.use("/category",category)
app.use("/food",foodRoute)
app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
})