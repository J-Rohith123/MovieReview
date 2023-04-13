import express  from "express";
import * as dotenv from 'dotenv';
import movierouter from './Routes/movies.js'
import mongoose from "mongoose";
import cors from 'cors'
import userrouter from "./Routes/users.js";
import ReviewRouter from "./Routes/reviews.js";

//express app
const app=express()
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
   console.log(req.path,req.method)
   next()
})
app.use('/movies',movierouter)
app.use('/users',userrouter)
app.use('/reviews',ReviewRouter)
//routes
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
//listen for requests
app.listen(process.env.PORT,()=>{
   console.log("Connected to database and Listening on port ",process.env.PORT)
  })
})
.catch((err)=>{
  console.log(err)
})

