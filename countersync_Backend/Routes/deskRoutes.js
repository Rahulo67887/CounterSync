const express=require("express");
const router=express.Router();

const {createDesk, loginDesk}=require("../Controllers/deskControllers");

const validate=require("../middlewares/validate_Middleware");
const validate_loginSchema=require("../validators/validate_loginSchema");
const validate_signupSchema=require("../validators/validate_signupSchema");

router.post("/create", validate(validate_signupSchema), createDesk);
router.post("/login", validate(validate_loginSchema), loginDesk);

module.exports=router;