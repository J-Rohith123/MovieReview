import express from "express";
import * as usercontrols from '../controllers/usercontroller.js'


const userrouter=express.Router()

userrouter.get('/',usercontrols.getUsers)

userrouter.post('/',usercontrols.addUser)

userrouter.get('/:id',usercontrols.getOneUser)

userrouter.put('/:id',usercontrols.updateUser)

export default userrouter