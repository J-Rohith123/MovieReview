import Review from "../models/reviewSchema.js";
import mongoose from "mongoose";

//get movie reviews
export async function getReviews(req,res){
    try{
       const {id} =req.params
       
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such movie found!"})
      }
      const review=await Review.find({movieid:id})
      if(!review){
        return res.status(400).json({error:"No such movie found!"})
      }
      res.status(200).json(review)
    }catch(err){
        res.status(400).json({error:err})
    }
}

export async function postReview(req,res){
    const {title,review,rating,username,userid,movieid}=req.body
    try{
       const myreview=await Review.create({title,review,rating,username,userid,movieid})
       res.status(200).json(myreview)
    }catch(err){
        res.status(400).json({error:err})
    }
}

export async function deleteReview(){
  try{
    const {id}=req.params
    
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such movie found!"})
      }
      const review=await Review.findOneAndDelete({_id:id})
      if(!review){
        return res.status(400).json({error:"No such movie found!"})
      }
      res.status(200).json(review)

  }catch(err){
    res.status(400).json({error:err})
  }
}