import React from 'react'
import { ErrorMessage, Field, Formik,Form } from "formik"
import { useDispatch, useSelector } from "react-redux"
import {  useNavigate } from "react-router"
import * as Yup from 'yup'
import {  useState } from "react"
import '../CSS/Auth.css'
import * as actions from '../state/actions'
import { toast  } from 'react-toastify'

function Profile() {
  const [edit,setedit]=useState(false)
    const user=useSelector(state => state?.user)

  const EditProfile=()=>{
    
    
    
    const initialValues={
        email:user.email,password:user.password,fname:user.fname,lname:user.lname,phone:user.phone
    }
       
      
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
           
            if(window.confirm('Are you sure you want to update?')){
                dispatch(actions.UpdateUser(val,user._id))
                navigate('/profile') 
                setedit(false)
                toast.success("Successfully Updated!!",{
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
           
        }
    
        return(
            <div>
                
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            <Form className="myform bg-dark text-light" >
           
            <h2 style={{textAlign:'center'}}>Profile</h2>
                <p>{user.email}</p>
    
                <div className="form-group row">
                    <div className="col-xs-3">
                     <label htmlFor="password" className="form-label">Password<sup style={{color:'red'}}>*</sup></label>
                     </div>
                    <div className="col-auto">
                     <Field type="password" id='password' autocomplete="new-password" className="form-control" name='password' placeholder='Enter your password' />
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
            
            </Form>
            </Formik>
           
            </div>
        )
  }

  return (
    
    <div>
      {
        edit ? <EditProfile/> : <div class="container " style={{justifyContent:'center'}} >
        <div class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <img src="images/usericon.png" style={{backgroundColor:'white'}} alt="User Profile" class="rounded-circle img-fluid"/>
                </div>
                <div class="col-md-8">
                  <h3 class="card-title">{user?.fname} {user?.lname}</h3>
                  
                  <ul class="list-unstyled">
                    <li><i class="fa fa-envelope-o"></i>{user?.email}</li>
                    <li><i class="fa fa-phone"></i>{user?.phone}</li>
                  </ul>
                  <button type="button" class="btn btn-outline-light" onClick={()=>setedit(true)} >Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      </div>
      }
  </div>
    


  )
}

export default Profile
