// Centralized error-handling middleware
const errorMiddleware=(err, req, res, next)=>{
    const errStatus= err.status || 500; // Use provided status code or default to 500 (Internal Server Error)
    const errMsg=err.message || "Something went wrong";  // Main error message
    const extraDetails=err.extraDetails || "Internal Server Error";  // Additional details

    return res.status(errStatus).json({  // Send standardized error response
        errMsg, extraDetails
    });
}

module.exports=errorMiddleware;