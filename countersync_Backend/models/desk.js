const mongoose=require("mongoose");  // Import mongoose ODM for MongoDB
const bcrypt=require("bcryptjs");  // Import bcrypt for password hashing and comparison
const jwt=require("jsonwebtoken");  // Import jsonwebtoken for authentication token generation

const deskSchema=mongoose.Schema({ // Define schema for Desk
    deskName:{  // Unique desk/user name
        type : String,
        required : true,
        unique : true,
    },
    password : {  // Stores hashed password
        type : String,
        required : true,
    },
    isAdmin : {  // Role-based access flag
        type : Boolean,  
        default : false,
    },
    counter : {  // Reference to Counter collection (used for sequencing / tracking)
        type : mongoose.Schema.Types.ObjectId,
        ref : "Counter",
    }
});

// method to compare entered password with hashed password
deskSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password);
}

// Method to generate JWT authentication token
deskSchema.methods.generateAuthToken=async function(){
    try{
        return jwt.sign(
        {
            userId : this._id.toString(), // unique identifier
            userName : this.userName,  // included in token payload
            isAdmin : this.isAdmin,  // role info
        },
        process.env.secret_Key_JWT,  // secret key from environment variables
        {
            expiresIn:"30d",  // token validity
        }
        );
    }catch(err){
        console.log(err);
    }
}


// Pre-save middleware to hash password before saving to database
deskSchema.pre("save", async function(){
    console.log(this);
    const user=this;

    try{
        const saltRounds=await bcrypt.genSalt(10);   // Generate salt for hashing
        const hashedPassword=await bcrypt.hash(user.password, saltRounds);  // Hash the plain text password
        user.password=hashedPassword; // Replace plain password with hashed password
    }catch(err){
        console.log(err);
    }   
});

let Desk=mongoose.model("Desk", deskSchema);// Create Desk model from schema
module.exports=Desk;