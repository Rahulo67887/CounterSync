const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

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

deskSchema.pre("save", async function(){
    console.log(this);
    const user=this;
    const saltRounds=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(user.password, saltRounds);
    user.password=hashedPassword;
});

let Desk=mongoose.model("Desk", deskSchema);
module.exports=Desk;