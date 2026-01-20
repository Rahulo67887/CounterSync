const Desk=require("../models/desk");  // Import Desk model (Mongoose schema for desk users)

// Controller to create a new desk (signup)
const createDesk=async(req, res, next)=>{
    try{
        let{deskName, password, isAdmin}=req.body; // Extract deskName, password, isAdmin from validated request body

        // Check if deskName already exists in database
        const existingDesk = await Desk.findOne({ deskName });
        if (existingDesk) {
            return res.status(409)
                .json({
                    errMsg: "Desk name already exists",
                });
        }


         // Create new Desk instance
        const newDesk=new Desk({
            deskName,
            password,  // will be hashed automatically by pre("save") hook
            isAdmin,
        });

        await newDesk.save();  // Save the new desk to the database

        const token = await newDesk.generateAuthToken(); // Generate JWT token for authentication

        // Respond with success, token, and user ID
        return res.status(201).json(
                {
                    msg : "desk created",
                    token,
                    userId : newDesk._id.toString(),
                }
            );
    }
     // Handle unique constraint errors
    catch(error){
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json({
                errMsg: "Desk name already exists",
            });
        }
        // Pass any other errors to centralized error middleware
        next(error);
    }
};


// Controller to log in an existing desk
const loginDesk=async(req, res, next)=>{
    try{
        // Extract login credentials from request body
        const{deskName, password}=req.body;
        console.log(deskName,password);

        // Find desk by deskName
        const desk=await Desk.findOne({deskName});
        console.log(desk);
        if(!desk){  // If desk does not exist, return unauthorized
            return res.status(401).json({msg:" "});
        }

        // Compare entered password with stored hashed password
        const isMatch=await desk.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({msg: ""});
        }

        // Generate token and respond with success
        res.status(200).json({
            msg: "Login successfull",
            token: await desk.generateAuthToken(),
            userId: desk._id.toString(),
        });
    }
    catch(error){
        console.log(error);
        // Pass errors to centralized error-handling middleware
        next(error);
    }
};

module.exports={createDesk, loginDesk};