if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
app.use(express.json());
const mongoose=require("mongoose");
const Db_URL=process.env.DB_URL;
const Desk=require("./models/desk");

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/create", (req, res)=>{
    const {userName, password, isAdmin}=req.body;
    if(isAdmin==="true"){
        isAdmin=true;
    }
    const newDesk=new Desk({
        userName,
        password,
        isAdmin,
    });
    newDesk.save()
    .then((desk)=>{
        res.status(201).json(desk);
    })
})

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