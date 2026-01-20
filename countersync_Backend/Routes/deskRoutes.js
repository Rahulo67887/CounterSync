const express=require("express"); // Import Express framework
const router=express.Router(); // Create a new router

const {createDesk, loginDesk}=require("../Controllers/deskControllers");  // Import controller functions for desk operations

const validate=require("../middlewares/validate_Middleware");  // Import validation middleware

// Import Zod schemas for request validation
const validate_loginSchema=require("../validators/validate_loginSchema");
const validate_signupSchema=require("../validators/validate_signupSchema");

router.post("/create", validate(validate_signupSchema), createDesk);  // Route to create a new desk (signup)
router.post("/login", validate(validate_loginSchema), loginDesk);  // Route to login an existing desk

module.exports=router;