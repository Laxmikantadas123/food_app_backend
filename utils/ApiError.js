const ApiError=(statusCode,message="something went worng",errors)=>{
    const error=new Error(message)
    error.statusCode=statusCode;
    error.errors=errors;
    
    return error
}
module.exports=ApiError