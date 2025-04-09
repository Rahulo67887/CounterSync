if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Db_URL=process.env.DB_URL;

app.get("/", (req, res) => {
    res.send("Server is running!");
});

async function dbConnect(){
    mongoose.connect(Db_URL);
}

dbConnect()
.then(()=>{
    console.log(" database connected!");
})
.catch((err)=>{
    console.log(err);
});

app.listen(3000, ()=>{
    console.log("app is listening at port 3000");
});