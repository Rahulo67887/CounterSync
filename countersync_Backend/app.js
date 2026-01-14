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

const startServer = async () => {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("app is listening at port 3000");
        });
    } catch (err) {
        console.error("DB connection failed", err);
    }
};

startServer();