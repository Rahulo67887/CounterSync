const mongoose=require("mongoose");

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

let Desk=mongoose.model("Desk", deskSchema);
module.exports=Desk;