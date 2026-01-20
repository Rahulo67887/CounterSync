const mongoose=require("mongoose");  // Import mongoose ODM for MongoDB

// Async function to connect to the database
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);  // Connect to MongoDB using URL from environment variables
        console.log("Database connected");  // Log success message
    }
    catch(error){
        console.error("DB connection failed", error);   // Log error if connection fails
        process.exit(1); // Exit the process with failure code
    }
};

module.exports=connectDB;