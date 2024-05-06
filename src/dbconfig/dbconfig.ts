import mongoose from "mongoose";
//const mongoose = require('mongoose');


export async function connect(){
    try{ 
        // !MAKES SURE DATA WILL COME 100%
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("MongoDB connected");
        })

        connection.on('error',(err)=>{
            console.log("MongoDB connection error, please make sure db is up and running:" + err);
            process.exit();
        })
    }
    catch(error){
        console.log("Something went wrong in connection to DB");
        console.log(error);
    }
}