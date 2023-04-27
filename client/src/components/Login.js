import {  useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import '../CSS/Auth.css'
import * as actions from '../state/actions'
import { toast  } from 'react-toastify'
import axios from "axios"

export default function SigninForm(){
    const users=useSelector(state => state?.users)
    const [errText,setErrText] = useState({})
    const [formvalues,setformvalues]=useState({email:'',password:''})
    const [issubmit,setissubmit]=useState(false)
  
    const navigate=useNavigate()
     
    const dispatch=useDispatch()
    
   
     

     const showError=(val)=>{
         setErrText(val)
     }
     const handlechange=(e)=>{
      const {name,value}= e.target
      setformvalues({...formvalues,[name]:value})
     }
     const validate =(vals)=>{
       const errors={}
       const regex = /^[^\$@]+@[^\$@]+\.[^\$@]{2,}$/i;
       if(!vals.email){
        errors.email='Email is required!'
       }else if(!regex.test(formvalues.email)){
        errors.email='Enter a valid email format!'
       }
       if(!vals.password){
        errors.password='Password is required!'
       }
       return errors
     }
     

     const checkuser=(e)=>{
           e.preventDefault();
          setErrText( validate(formvalues) )
          setissubmit(true)
          if(Object.keys(errText).length === 0 && issubmit){
             uservalidation()
          }
       
     }
     const uservalidation=async()=>{
       
      // let userdata =  {email:'',password:''}
      // users.map(
      //   user =>{
      //     if(user.email === formvalues.email && user.password===formvalues.password )
      //     { 
      //         userdata=user
      //     }
      //   }
      //  )



       let response=await (await axios.post('http://localhost:3005/login',{email:formvalues.email,password:formvalues.password})).data
          
       if(response.email){
           if(response.auth){
            dispatch(actions.setUser(response.userid))
                  navigate('/')
                  toast.success("Logged in Successfully!!",{
                   position:"top-center",
                   autoClose:3000,
                   hideProgressBar:false,
                   closeOnClick:true,
                   pauseOnHover:false,
                   draggable:false,
                   progress:undefined,
                   theme:'dark'
                  })
           }else{
            toast.error("Invalid Password",{
                  position:"top-center",
                  autoClose:3000,
                  hideProgressBar:false,
                  closeOnClick:true,
                  pauseOnHover:false,
                  draggable:false,
                  progress:undefined,
                  theme:'dark'
                 })
           }
        }else{
          toast.error("Invalid Email",{
                position:"top-center",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:false,
                draggable:false,
                progress:undefined,
                theme:'dark'
               })
        }




      //  if(userdata.email === ''){
      //    toast.error("Invalid Login",{
      //     position:"top-center",
      //     autoClose:3000,
      //     hideProgressBar:false,
      //     closeOnClick:true,
      //     pauseOnHover:false,
      //     draggable:false,
      //     progress:undefined,
      //     theme:'dark'
      //    })
      //  }else{
      //       dispatch(actions.setUser(userdata._id))
      //       navigate('/')
      //       toast.success("Logged in Successfully!!",{
      //        position:"top-center",
      //        autoClose:3000,
      //        hideProgressBar:false,
      //        closeOnClick:true,
      //        pauseOnHover:false,
      //        draggable:false,
      //        progress:undefined,
      //        theme:'dark'
      //       })
      //  }
     }
    
    return(
        <div class="login-dark" >
        <form  onSubmit={checkuser}>
        <p style={{color:'red'}}>{errText.top}</p>
            <h2 class="sr-only">Login Form</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
            <div class="form-group"><input class="form-control" type="email" name="email" value={ formvalues.email } onChange={handlechange} placeholder="Email" />
            <p style={{color:'red'}} >{errText.email}</p></div>
            <div class="form-group"><input class="form-control" type="password" name="password" value={ formvalues.password } onChange={ handlechange} placeholder="Password" />
            <p style={{color:'red'}} >{errText.password}</p></div>
            <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Log In</button></div><a href="/register" class="forgot">Haven't registerd yet?Register Here</a></form>
            
    </div>
    )
}