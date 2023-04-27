import User from '../models/userSchema.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function getUsers(req,res){
  try{
   const users= await User.find({})
   res.status(200).json(users)
  }catch(err){
    res.status(400).json({error:err})
  }
}
export async function addUser(req,res){
    try{
     const { fname,lname,phone,password,email }=req.body
    
     const salt=await bcrypt.genSalt(10)
     const secpass= await bcrypt.hash(password,salt)
     
    
     const user=await User.create({fname,lname,phone,password:secpass,email,admin:false})
    const data={id:user._id}
    const authToken=jwt.sign(data,process.env.SECRET_KEY)
     res.status(200).json({authToken})
    }catch(err){
        res.status(400).json({error:err})
    }
}
export async function getUser(req,res){
  try {
    const userId=req.user
    console.log(userId)
    const user=await User.findById(userId).select("-password")
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error})
  }
}
export async function getOneUser(req,res){
  const {id}= req.params
  try{
   const user=await User.findById(id)
   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"No such user found!"})
  }
  if(!user){
    return res.status(400).json({error:"No such user found!"})
  }
  res.status(200).json(user)
  }catch(err){
      res.status(400).json({error:err})
  }
}
export async function updateUser(req,res){
   
  try{
     const {id} = req.params
     
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({error:"No such user found!"})
    }
    const user= await User.findOneAndUpdate({_id:id},{...req.body})
    const uptuser=await User.findById(user._id)
    if(!user){
      return res.status(400).json({error:"No such user found!"})
    }
    
    res.status(200).json(uptuser)
  }catch(err){
      res.status(400).json({error:err})
  }
}

