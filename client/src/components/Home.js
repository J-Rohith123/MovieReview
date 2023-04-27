import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../state/actions'
import '../CSS/Home.css'
import { useNavigate } from 'react-router'

function Home() {
const dispatch=useDispatch()
const navigate=useNavigate()
const movies=useSelector(state => state?.movies)
    useEffect(()=>{
    dispatch(actions.getMovies())
    },[])
    
  return (<div className='home' >
    <h2 style={{width:'fit-content',color:'white'}} >Trending Movies:</h2>
    <div className='container'>
     
    {
         movies?.length===0 ? <LoadingGif/> : movies?.map((movie)=>
         <div key={movie.id} className='card' id='movies' onClick={()=> navigate("movies/"+movie.title,{state:movie._id}) } style={{backgroundColor:'transparent'}}>
          <div className='light' ></div>
            <img className='image-responsive image-resize' style={{borderRadius:'10px'}} src={movie.poster} alt='poster' ></img>
            <div className='content'>
           <p className='card-title' style={{color:'gold',fontWeight:'700'}} >{movie.title}</p>
           <p className='card-title'><b>Rating:</b> ⭐{movie.rating}</p>
           <p className='card-title'><b>Directed by:</b> {movie.director}</p>
            </div>
         </div>
        )
    }
    </div>
    </div>
  )
}
function LoadingGif(){
  return(
    <img className='loading' src='images/loading.webp' alt='loading' ></img>
  )
}
export default Home
