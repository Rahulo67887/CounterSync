if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const Db_URL=process.env.DB_URL;
const Desk=require("./models/desk");
const bcrypt=require("bcryptjs");
const signupSchema=require("./validators/validate_DeskSchema");
const validate=require("./middlewares/validate_Middleware");
const errorMiddleware = require("./middlewares/error_middleware");

const corsOptions={
    origin:"http://localhost:5173",
    methods : "GET, POST, PUT, DELETE",
    credentials : true,
};

app.use(cors(corsOptions));

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/create", validate(signupSchema), async (req, res)=>{
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
        next(err);
    }
})

app.post("/login", validate(signupSchema),  async (req, res)=>{
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
        next(err);
    }
})

app.use(errorMiddleware);

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