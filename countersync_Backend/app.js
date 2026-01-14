// Load environment variables from .env file in non-production environments
if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require("express");
const cors=require("cors");

const corsOptions=require("./config/cors"); // CORS configuration (allowed origins, methods, etc.)
const connectDB=require("./config/db"); // MongoDB connection logic
const deskRoutes=require("./Routes/deskRoutes"); // Routes related to desk operations
const errorMiddleware = require("./middlewares/error_middleware"); // Centralized error handler

// Initialize Express application
const app=express();

app.use(cors(corsOptions)); // Enable CORS with custom configuration
app.use(express.json()); // Middleware to parse incoming JSON request bodies


app.get("/", (req, res) => { // default route
    res.send("Server is running!"); 
});

app.use("/countersync/desk", deskRoutes); // Mount desk-related routes

app.use(errorMiddleware); // Global error-handling middleware

// Async function to ensure the database is connected
const startServer = async () => {
    try {
        await connectDB(); // Establish connection with the database
        app.listen(3000, () => { // Start the Express server only after DB connection is successful
            console.log("app is listening at port 3000");
        });
    } catch (err) { // Catch and log any errors during database connection
        console.error("DB connection failed", err);
    }
};

startServer(); // Invoke the startup function