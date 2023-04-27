import express from "express";
import * as dotenv from 'dotenv';
import movierouter from './Routes/movies.js'
import mongoose from "mongoose";
import cors from 'cors'
import userrouter from "./Routes/users.js";
import ReviewRouter from "./Routes/reviews.js";
import User from "./models/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//express app
const app = express()
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/movies', movierouter)
app.use('/users', userrouter)
app.use('/reviews', ReviewRouter)
app.use('/login', async (req, res) => {
  try {
    const response = {
      email: false,
      auth: false,
      userid:''
    }
    const { email, password } = req.body
    const users = await User.find({ email: email })
    if (users.length > 0) {
      response.email = true
      // const bcryptcompare = await bcrypt.compare(password, users[0].password)
      // if (bcryptcompare) {
      //   const data = { id: users[0]._id }
      //   const authToken = jwt.sign(data, process.env.SECRET_KEY)
      //   response.auth=true
      //   response.authToken=authToken
      //   res.status(200).json(response)
      if(password===users[0].password){
        response.auth=true
        response.userid=users[0]._id
      }
    }
    res.status(200).json(response)

  } catch (err) {
    res.status(400).json({ error: err })
  }
})
//routes
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to database and Listening on port ", process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })

