// Middleware for validating request bodies using Zod schemas
const validate=(schema) => async(req, res, next) => {
    try{
        const parseBody= await schema.parseAsync(req.body);  // Parse and validate the request body asynchronously
        req.body=parseBody;  // Replace original body with validated data
        next();  // Proceed to next middleware or controller
    }catch(err){
        // If validation fails, create a standardized error object
        const status = 422;  // Unprocessable Entity
        const message = "fill the form properly";  // Generic message for client
        const extraDetails = err.errors[0].message;  // Extract first validation error message
        const error={
            status,
            message,
            extraDetails,
        }
        next(error); // Pass error to centralized error-handling middleware
    }
};

module.exports=validate;