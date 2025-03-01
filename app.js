const express=require("express");
const app=express();
const mongoose=require("mongoose");

app.get("/", (req, res) => {
    res.send("Server is running!");
});

async function dbConnect(){
    mongoose.connect('mongodb://127.0.0.1:27017/counterSync');
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