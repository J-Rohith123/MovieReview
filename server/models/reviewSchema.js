import mongoose from "mongoose";

const Schema=mongoose.Schema

const ReviewSchema=new Schema({
    title:String,
    review:String,
    rating:Number,
    userid:String,
    username:String,
    movieid:String
})

export default mongoose.model('Review',ReviewSchema)