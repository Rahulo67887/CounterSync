const mongoose=require("mongoose");

const counterSchema=mongoose.Schema({
    counterNumber : {
        type : Number,
        required : true,
    },
    count : {
        type : Number,
        required : true,
    }
});

let Counter=mongoose.model("Counter", counterSchema);
module.exports=Counter;