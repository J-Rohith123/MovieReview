import Movie from '../models/moviesSchema.js'
import mongoose from 'mongoose'

//get all movies
export async function getMovies(req,res){
    try{
        const movies=await Movie.find({})
        res.status(200).json(movies)
    }catch(err){
        res.status(400).json({error:err})
    }
}
//get single movie
export async function getOneMovie(req,res){
    try{
      const { id }=req.params
      const movie=await Movie.findById(id)
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such movie found!"})
      }
      if(!movie){
        return res.status(400).json({error:"No such movie found!"})
      }
      res.status(200).json(movie)
    }catch(err){
        res.status(400).json({error:err})
    }
}

//create a new movie
export async function createMovie(req,res){
    const {title,poster,director,year,bg_poster,rating,overview,reviews}=req.body
    try{
       const movie=await Movie.create({title,poster,director,year,bg_poster,rating,overview,reviews})
       res.status(200).json(movie)
    }catch(err){
        res.status(400).json({error:err})
    }
}

//delete a movie
export async function deleteMovie(){
  try{
    const {id}=req.params
    
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such movie found!"})
      }
      const movie=await Movie.findOneAndDelete({_id:id})
      if(!movie){
        return res.status(400).json({error:"No such movie found!"})
      }
      res.status(200).json(movie)

  }catch(err){
    res.status(400).json({error:err})
  }
}
//update a movie
export async function updateMovie(req,res){
   
    try{
      const {title,poster,director,year,bg_poster,rating,overview,reviews}=req.body
       const {id} = req.params
       
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such movie found!"})
      }
      console.log(req.body)
      const movie= await Movie.findOneAndUpdate({_id:id},{title,poster,director,year,bg_poster,rating,overview,reviews})
      
      if(!movie){
        return res.status(400).json({error:"No such movie found!"})
      }
      res.status(200).json(movie)
    }catch(err){
      console.log(err)
        res.status(400).json({error:err})
    }
}

