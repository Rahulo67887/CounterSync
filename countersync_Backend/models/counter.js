const mongoose=require("mongoose"); // Import mongoose ODM for MongoDB

const counterSchema=mongoose.Schema({ // Define schema for maintaining counters 
    counterNumber : {  // Identifier for the counter 
        type : Number,
        required : true,
    },
    count : {   // Stores the current count value
        type : Number,
        required : true,
    }
});

let Counter=mongoose.model("Counter", counterSchema); // Create Counter model from the schema
module.exports=Counter;