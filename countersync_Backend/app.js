if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require("express");
const cors=require("cors");

const corsOptions=require("./config/cors");
const connectDB=require("./config/db");
const deskRoutes=require("./Routes/deskRoutes");
const errorMiddleware = require("./middlewares/error_middleware");


const app=express();

app.use(cors(corsOptions));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use("/countersync/desk", deskRoutes);

app.use(errorMiddleware);

connectDB();

app.listen(3000, ()=>{
    console.log("app is listening at port 3000");
});