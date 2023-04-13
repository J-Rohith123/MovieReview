import React, { useRef } from 'react'
import '../CSS/NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../state/actions'
import { toast  } from 'react-toastify'
import { useNavigate } from 'react-router'


function NavBar(props) {
 
  return (
    <div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{height:'90px',zIndex:'2'}} >
  <div class="container-fluid">
    <a class="navbar-brand"  href="/"><img id='logo' src='images/Logo.png' ></img>My Review</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <RenderMenu searchmovie={props.searchmovie} setmovie={props.setsearchmovie} />
    </div>
  </div>
</nav>
    </div>
  )
}

const RenderMenu=(props)=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const search=useRef()
  const loggedin= useSelector(state => state?.loggedIn)
  const user= useSelector(state => state?.user)
  const movies= useSelector(state => state?.movies)

  function Logout(){
    
    if(window.confirm("Are you sure you want to log out?")){
      dispatch(actions.loggedOut())
      navigate('/')
      toast.success("Logged out Successfully!!",{
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
  const Suggestions=()=>{
    return(
      <div id='suggestions' >
        {
          movies?.filter(i=> i.title?.toLowerCase().includes(props.searchmovie)).map(movie =>
            <p id='suggestedmovie' onClick={()=>{
              search.current.value=""
              props.setmovie("")
              navigate("movies/"+movie.title,{state:movie._id})
            } } >{movie.title}</p>
          )
        }
      </div>
    )
  }
  const changelook=(e)=>{
    console.log(e.target.checked)
    dispatch(actions.changeLook(e.target.checked))
  }

   if(!loggedin){
    return(
      <>
      <ul class="navbar-nav me-auto ">
      <li class="nav-item">
          <a class="nav-link active" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/movies">Movies</a>
        </li>
        <div className='text-light' id='searchcontainer' >
        <form class="d-flex"  >
        <input class="form-control me-2" type="search" ref={search} onChange={(e)=>props.setmovie(e.target.value) } placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
       {
        props.searchmovie? <Suggestions/> : null
       } 
      </div>
        </ul>
        <ul className='navbar-nav ms-auto' style={{margin:'8%'}}>
        <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="images/usericon.png" alt="Profile" style={{width:'50px',padding:'5%',height:'50px',backgroundColor:'whitesmoke'}} class="rounded-circle"/>
        </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown" >
            <li><a class="dropdown-item" href="/signin">Log In</a></li>
            <li><a class="dropdown-item" href="/register">Register</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="/settings">Settings</a></li>
          </ul>
        </li>
        </ul></>
    )
   }else{
    return(

    <>
      <ul class="navbar-nav me-auto ">
      <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/movies">Movies</a>
        </li>
        <div className='text-light' id='searchcontainer' >
        <form class="d-flex"  >
        <input class="form-control me-2" type="search" ref={search} onChange={(e)=>props.setmovie(e.target.value) } placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
       {
        props.searchmovie? <Suggestions/> : null
       } 
      </div>
        </ul>
        <ul className='navbar-nav ms-auto' style={{margin:'8%'}}>
        <li class="nav-item" style={{alignItems:'end'}} >
          <a class="nav-link" href="/profile" style={{color:'cyan',fontWeight:'500'}} >Hello {user.fname}</a>
        </li>
        <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="images/usericon.png" alt="Profile" style={{width:'50px',padding:'5%',height:'50px',backgroundColor:'whitesmoke'}} class="rounded-circle"/>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown" >
            <li><a class="dropdown-item" href="/profile">Profile</a></li>
            <li><a class="dropdown-item" href="/settings">Settings</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><p class="dropdown-item" onClick={Logout}>Log out</p></li>
          </ul>
        </li>
         {
          user?.admin ? <li > <label htmlFor='admincheckbox' onChange={(e)=>changelook(e)} className='text-light' ><input type='checkbox' id='admincheckbox' /> User </label> </li> : null
         } 
        </ul></>
    )
   }
}


export default NavBar


