const errorMiddleware=(err, req, res, next)=>{
    const errStatus= err.status || 500;
    const errMsg=err.message || "Something went wrong";
    const extraDetails=err.extraDetails || "Internal Server Error";
    console.log("I m here");
    

    return res.status(errStatus).json({errMsg, extraDetails});
}

module.exports=errorMiddleware;