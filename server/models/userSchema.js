import mongoose from "mongoose";

const Schema=mongoose.Schema

const userSchema=new Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    phone:Number,
    admin:Boolean
})

export default mongoose.model('User',userSchema)
