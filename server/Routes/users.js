import express from "express";
import * as usercontrols from '../controllers/usercontroller.js'
import FetchUser from "../middlewares/fetchUser.js";


const userrouter=express.Router()

userrouter.get('/',usercontrols.getUsers)

userrouter.post('/',usercontrols.addUser)

userrouter.get('/:id',usercontrols.getOneUser)

userrouter.put('/:id',usercontrols.updateUser)

userrouter.post('/getuser',FetchUser,usercontrols.getUser)

export default userrouter