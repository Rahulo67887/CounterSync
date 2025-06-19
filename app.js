if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
app.use(express.json());
const mongoose=require("mongoose");
const Db_URL=process.env.DB_URL;
const Desk=require("./models/desk");
const bcrypt=require("bcryptjs");

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/create", async (req, res)=>{
    try{
        const {deskName, password, isAdmin}=req.body;
        if(isAdmin==="true"){
            isAdmin=true;
        }

        const newDesk=new Desk({
            deskName,
            password,
            isAdmin,
        });
        newDesk.save()
        .then( async (desk)=>{
            res.status(201).json(
                {
                    msg : "desk created",
                    token : await newDesk.generateAuthToken(),
                    userId : newDesk._id.toString(),
                }
            );
        })
    }catch(err){
        console.log(err);
        res.status(500).json("internal server error");
    }
})

app.post("/login", async (req, res)=>{
    try{
        const {deskName, password} = req.body;
        const desk=await Desk.findOne({deskName});
        if(desk){
            isDesk=desk.comparePassword(password);
        }
        else{
            res.status(500).json("Invalid Credentials");
        }
        if(isDesk){
            res.status(201).json({
                msg : "login successfull",
                token : await desk.generateAuthToken(),
                userId : desk._id.toString(),
            })
        }
        else{
            res.status(500).json("Invalid Credentials");
        }
    }catch(err){
        res.status(500).json("internal server error");
    }
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