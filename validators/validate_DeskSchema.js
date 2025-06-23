const { z } = require("zod");

const signupSchema = z.object({
  deskName: z
    .string({ required_error: "Desk Name is required" })
    .trim()
    .min(3, { message: "Desk Name should at least contain 3 letters" })
    .max(20, { message: "Desk Name should at most contain 20 letters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Desk Name should at least contain 8 letters" })
    .max(20, { message: "Desk Name should at most contain 20 letters" }),
});

module.exports=signupSchema;