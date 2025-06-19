const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const deskSchema=mongoose.Schema({
    userName:{
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    counter : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Counter",
    }
});

deskSchema.methods.generateAuthToken=async function(){
    try{
        return jwt.sign(
        {
            userId : this._id.toString(),
            userName : this.userName,
            isAdmin : this.isAdmin,
        },
        process.env.secret_Key_JWT,
        {
            expiresIn:"30d",
        }
        );
    }catch(err){
        console.logg(err);
    }
}

deskSchema.pre("save", async function(){
    console.log(this);
    const user=this;

    try{
        const saltRounds=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(user.password, saltRounds);
        user.password=hashedPassword;
    }catch(err){
        console.log(err);
    }   
});

let Desk=mongoose.model("Desk", deskSchema);
module.exports=Desk;