import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true,"Please enter a username"],
        unique: true
    },
    email:{
        type:String,
        required:[true,"Please enter a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter a password"]
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    forgotPassword: String,
    forgotPasswordTokenExpiry:Date,
    varifyToken:String,
    varifyTokenExpiry:Date


})

// if models created take this  || create model
const User = mongoose.models.users || mongoose.model("users" ,userSchema);

export default User;