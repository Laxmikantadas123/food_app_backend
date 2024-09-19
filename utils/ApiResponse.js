const ApiResponse=(statusCode,data,message="Success",token)=>{
    return{
      statusCode:statusCode,
      data:data,
      message:message,
      success:statusCode<400,
      token:token

    }
}

module.exports=ApiResponse