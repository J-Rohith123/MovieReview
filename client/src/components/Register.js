import { ErrorMessage, Field, Formik,Form } from "formik"
import { useDispatch, useSelector } from "react-redux"
import {  useNavigate } from "react-router"
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import '../CSS/Auth.css'
import * as actions from '../state/actions'
import { toast  } from 'react-toastify'

export default function RegistrationForm(){
    const users=useSelector(state => state?.users)
    
    
const initialValues={
    email:'',password:'',fname:'',lname:'',phone:''
}
   const [errtext,seterrtext]=useState('')
  
const validationSchema =Yup.object({
    email:Yup.string().email('Email must be a valid email').required('Required field'),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required('Required field'),
    fname:Yup.string().required('Required field'),
    lname:Yup.string().required('Required field'),
    phone:Yup.number().required('Required field')
}
)
const navigate=useNavigate()
    const dispatch=useDispatch()

    const onSubmit=(val)=>{
        let userdata =  {email:'',password:''}
     console.log(val)
      users?.map(
        user =>{
          if(user.email === val.email)
          {  
              userdata=user
          }
        }
       )
    
       if(userdata.email === ''){
        if(window.confirm('Are you sure you want to register?')){
            dispatch(actions.addUser(val))
            navigate('/') 
            toast.success("Successfully Registered",{
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
          seterrtext('Email already registered')
       }
    }

    return(
        <div>
            
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
        <Form className="myform bg-dark text-light" >
        <p style={{color:'red',textAlign:'center'}} >{errtext}</p>
        <h2 style={{textAlign:'center'}}>Register</h2>
            <div className="form-group row">
                <div className="col-xs-3">
                 <label htmlFor="email" className="form-label">Email<sup style={{color:'red'}}>*</sup></label>
                 </div>
                <div className="col-auto">
                 <Field type="email" id='email' autocomplete="new-password"  className="form-control" name='email' placeholder='Enter your Email' />
                 </div>
                <div className="col-auto" style={{color:'red'}}>
                 <ErrorMessage name="email" />
                 </div>
            </div>

            <div className="form-group row">
                <div className="col-xs-3">
                 <label htmlFor="password" className="form-label">Password<sup style={{color:'red'}}>*</sup></label>
                 </div>
                <div className="col-auto">
                 <Field type="text" id='password' autocomplete="new-password" className="form-control" name='password' placeholder='Enter your password' />
                 </div>
                <div className="col-auto" style={{color:'red'}}>
                 <ErrorMessage name="password" />
                 </div>
            </div>

            <div className="form-group row">
                <div className="col-xs-3">
                 <label htmlFor="fname" className="form-label">First Name<sup style={{color:'red'}}>*</sup></label>
                 </div>
                <div className="col-auto">
                 <Field type="text" id='fname' autocomplete="new-password" className="form-control" name='fname' placeholder='Enter your first name' />
                 </div>
                <div className="col-auto" style={{color:'red'}}>
                 <ErrorMessage name="fname" />
                 </div>
            </div>

            <div className="form-group row">
                <div className="col-xs-3">
                 <label htmlFor="lname" className="form-label">Last Name<sup style={{color:'red'}}>*</sup></label>
                 </div>
                <div className="col-auto">
                 <Field type="text" id='lname' autocomplete="new-password" className="form-control" name='lname' placeholder='Enter your last name' />
                 </div>
                <div className="col-auto" style={{color:'red'}}>
                 <ErrorMessage name="lname" />
                 </div>
            </div>


            <div className="form-group row ">
                <div className="col-xs-3">
                 <label htmlFor="phone" className="form-label">Phone Number<sup style={{color:'red'}}>*</sup></label>
                 </div>
                <div className="col-auto">
                 <Field type="string" id='phone' autocomplete="new-password" className="form-control" name='phone' placeholder='Enter your phone number' />
                 </div>
                <div className="col-auto" style={{color:'red'}}>
                 <ErrorMessage name="phone"  />
                 </div>
            </div>
           
        <button type="submit" className="btn btn-primary " style={{marginTop:'3%',borderRadius:'10px'}} >Submit</button>
        <p style={{fontSize:'0.8em'}} >Are you a user?<Link  to='/signin'>Sign in</Link></p>
        </Form>
        </Formik>
       
        </div>
    )
}