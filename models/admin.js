const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    userName:{
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    counter : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Counter",
    }
});

let Admin=mongoose.model("Admin", adminSchema);
module.exports(Admin);