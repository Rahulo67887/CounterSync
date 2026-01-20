const {z}=require("zod");  // Import Zod for schema-based input validation

const signupSchema=z.object({ // Define validation schema for user signup
    deskName: z  // deskName field validation rules
    .string({ required_error: "Desk Name is required" })
    .trim()
    .min(3, { message: "Desk Name should at least contain 3 letters" })
    .max(20, { message: "Desk Name should at most contain 20 letters" }),

  password: z   // password field validation rules
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password should at least contain 8 letters" })
    .max(20, { message: "Password should at most contain 20 letters" }),
});

module.exports=signupSchema;