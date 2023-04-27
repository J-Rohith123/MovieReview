import mongoose from "mongoose";

const Schema=mongoose.Schema

const moviesSchema=new Schema({
    title:String,
    poster:String,
    director:String,
    year:Number,
    bg_poster:String,
    rating:Number,
    overview:String,
    reviews:Array
},{timestamps:true})

export default mongoose.model('Movie',moviesSchema)