import React, { useEffect, useRef, useState } from 'react'
import '../CSS/Movies.css'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import * as actions from '../state/actions'
import { toast  } from 'react-toastify'
import Loading from './loading'

function Movies(props) {
  const dispatch=useDispatch()
  const [selectedmovie,setselectedmovie]=useState({})
  const movies=useSelector(state => state?.movies)
  const [mymovies,setmymovies]=useState(movies)
  const admin=useSelector(state => state?.admin)
  const navigate=useNavigate()
  
  const [filters,setfilters]=useState({latest:true,rating:false,alpha:false})
  useEffect(()=>{
    dispatch(actions.getMovies())
  },[])
  
  useEffect(()=>{
    setmymovies([...movies].sort((a,b)=> b.year-a.year))
  },[movies])
  
  useEffect(()=>{
    let filterlist=[]
    if(filters.rating){
      filterlist=[...movies].sort((a,b)=> b.rating-a.rating)
      setmymovies(filterlist)
    }else if(filters.latest){
      filterlist=[...movies].sort((a,b)=> b.year-a.year)
      setmymovies(filterlist)
    }else if(filters.alpha){
      filterlist=[...movies].sort((a,b)=> a.title.localeCompare(b.title))
      setmymovies(filterlist)
    }
  },[filters])
  
  
const deleteMovie=(e,id)=>{
  if(window.confirm('Are you sure you want to delete this movie?')){
    dispatch(actions.deleteMovie(id))
  }
}

  return (
    <div style={{display:'flex',position:'relative'}} >
      
      <div className='container' id='filter' >
      <div class="dropdown">
  <button class="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    Filter
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" id='filterlist' aria-labelledby="dropdownMenuButton2">
    <li>Sort By:</li>
    <li><hr class="dropdown-divider"/></li>
    <li><div class="form-check">
  <input class="form-check-input" type="radio" checked={filters.latest}  onChange={(e)=>setfilters({alpha:false,rating:false,latest:e.target.checked})} name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
    Latest
  </label>
</div></li>
<li><div class="form-check">
  <input class="form-check-input" type="radio" checked={filters.rating} onChange={(e)=>setfilters({alpha:false,rating:e.target.checked,latest:false})} name="flexRadioDefault" id="flexRadioDefault2"/>
  <label class="form-check-label" for="flexRadioDefault2">
    Rating
  </label>
</div></li>
<li><div class="form-check">
  <input class="form-check-input" type="radio" checked={filters.alpha} onChange={(e)=>setfilters({alpha:e.target.checked,rating:false,latest:false})} name="flexRadioDefault" id="flexRadioDefault2"/>
  <label class="form-check-label" for="flexRadioDefault2">
    A-Z
  </label>
</div></li>
    
  </ul>
</div>
      </div>
    <div className='container' id='moviescontainer' >
    
      <h1 className='text-light' style={{width:'85%',textAlign:'left'}} >Top Rated Movies:</h1>
      {
        admin ?<AddMovieModal/>:null
      }
      
     
      {
        [...mymovies]?.map(
          movie =>
           <div className='card bg-dark text-light' id='moviecard' >
          <img src={movie.poster} alt="poster" onClick={()=>navigate(movie.title,{state:movie._id})} ></img>
          <div className='moviecontent' >
          <div className='moviedata' onClick={()=>navigate(movie.title,{state:movie._id})} >
           <h3>{movie.title}</h3>
           <p>⭐ {movie.rating}</p>
           <p>{movie.overview?.slice(0,220)}{movie.overview?.length>220 ? '...' :null}</p>
          </div>
          {
            admin ?<div className='moviebuttons'>
            <button type='button' style={{fontWeight:'500'}} onClick={()=>setselectedmovie(movie) } data-bs-toggle="modal" data-bs-target="#updatemovie" className='btn btn-outline-warning' >Update</button>
            <UpdateMovie movie={selectedmovie} />
            <button type='button' style={{fontWeight:'500'}} onClick={(e)=>deleteMovie(e,movie._id)} className='btn btn-outline-danger' >Delete</button>
           </div> : null
          }
           
          </div>
        </div>
        )
      }
      
    </div>
    </div>
  )
}

const AddMovieModal=()=>{
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const AddMovie=(e)=>{
    e.preventDefault()

    const newmovie={
     title:e.target[0].value,
     poster:e.target[4].value,
     director:e.target[2].value,
     year:e.target[3].value,
     bg_poster:e.target[5].value,
     rating:0,
     overview:e.target[1].value,
     reviews:[]
    }
     dispatch(actions.addMovie(newmovie))
     navigate('/movies')
     toast.success("Added a new movie!!",{
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

  return(
    <div> <button type='button' className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#addmovie" >Add Movie</button>
        <div class="modal fade" id="addmovie" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content bg-dark text-light">
      <div class="modal-header text-light">
       <h5 class="modal-title" id="exampleModalLabel">Add New Movie</h5>
       <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={(e)=>AddMovie(e)} >
      <div class="modal-body" style={{backgroundColor:'#222',color:'#fff'}}>
       <label htmlFor='formmovietitle' >Title:<br/>
        <input type='text'  id='formmovietitle' ></input>
       </label>
       <label htmlFor='formreview' >Overview:
        <textarea className='form-control'  id='formreview' ></textarea>
       </label>
       <label htmlFor='formdirector' >Director:<br/>
        <input type='text'  id='formdirector' ></input>
       </label>
       <label htmlFor='formyear' >Year of Release:<br/>
        <input type='number' style={{width:'20%'}} id='formyear' ></input>
       </label>
       <label htmlFor='formposter' >Poster link:<br/>
        <input type='text'  id='formposter' ></input>
       </label>
       <label htmlFor='formbgposter' >Background poster link:<br/>
        <input type='text'  id='formbgposter' ></input>
       </label>
      </div>
      <div class="modal-footer text-light">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
       <button type="submit" class="btn btn-primary" >Add</button>
      </div></form>
      </div>
      </div>
      </div></div>
  )
}
const UpdateMovie=(props)=>{
  const movie={...props.movie}
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const updatemovie=(e)=>{
    e.preventDefault()
    const newmovie={
     title:e.target[0].value,
     poster:e.target[4].value,
     director:e.target[2].value,
     year:e.target[3].value,
     bg_poster:e.target[5].value,
     rating:movie.rating,
     overview:e.target[1].value,
     reviews:[...movie.reviews]
    }
     dispatch(actions.UpdateMovie(newmovie,movie._id))
     navigate('/movies')
  }

  return(
    <div>
        <div class="modal fade" id="updatemovie" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content bg-dark text-light">
      <div class="modal-header text-light">
       <h5 class="modal-title" id="exampleModalLabel">Add New Movie</h5>
       <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={(e)=>updatemovie(e)} >
      <div class="modal-body" style={{backgroundColor:'#222',color:'#fff'}}>
       <label htmlFor='formmovietitle' >Title:<br/>
        <input type='text' defaultValue={movie.title}  id='formmovietitle' ></input>
       </label>
       <label htmlFor='formreview' >Overview:
        <textarea className='form-control' defaultValue={movie.overview}   id='formreview' ></textarea>
       </label>
       <label htmlFor='formdirector' >Director:<br/>
        <input type='text' defaultValue={movie.director}   id='formdirector' ></input>
       </label>
       <label htmlFor='formyear' >Year of Release:<br/>
        <input type='number' defaultValue={movie.year}  style={{width:'20%'}} id='formyear' ></input>
       </label>
       <label htmlFor='formposter' >Poster link:<br/>
        <input type='text' defaultValue={movie.poster}   id='formposter' ></input>
       </label>
       <label htmlFor='formbgposter' >Background poster link:<br/>
        <input type='text' defaultValue={movie.bg_poster}   id='formbgposter' ></input>
       </label>
      </div>
      <div class="modal-footer text-light">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
       <button type="submit" class="btn btn-primary"  >Update</button>
      </div></form>
      </div>
      </div>
      </div></div>
  )
}

export default Movies
