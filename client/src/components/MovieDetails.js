import React, { useEffect, useLayoutEffect, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import '../CSS/moviedetails.css'
import StarRatings from 'react-star-ratings'
import ReviewCard from './ReviewCard'
import * as actions from '../state/actions'
import ReactStars from "react-rating-stars-component"



function MovieDetails() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const id=useLocation().state
    
   const movie=useSelector(state => state?.movie)
   const loggedin=useSelector(state => state?.loggedIn)
  //  const reviews=useSelector(state => state?.reviews)
   const [cache,setcache]=useState(true)
   useEffect(()=>{
     
     dispatch(actions.getOneMovie(id))
     dispatch(actions.getReviews(id))
     if(id==null){
      navigate('/')
     }
     
   },[id])
  useLayoutEffect(()=>{
    setcache(true)
    setTimeout(()=>{
      setcache(false)
    },200)
    
  },[])
   
  return (
     <div className='container' id='details_container'  >
      {
         loggedin? <ReviewModal /> : null
      }
       
    {/* remaining code */}
    {
      !cache ?<> <div className='bg_pic' style={{backgroundImage:`url(${movie?.bg_poster})`}} ></div>
      <div className='main_content' >
        <div className='bg_content'></div>
        <div className='card' id='poster' >
       <img src={movie?.poster} alt='poster'  ></img></div>
       <div className='container' >
       <div className='card' id='details' >
       <div className='bg_details'></div>
       <h3 style={{width:'fit-content',color:'#fffc0f'}} >{movie?.title}({movie?.year})</h3>
       <p>{ (movie?.rating - Math.trunc(movie?.rating) === 0.00)? movie?.rating :(movie?.rating)?.toFixed(1)}⭐</p>
       {/* <div id='ratingfill' style={{background:`conic-gradient(blue ${(movie?.rating * 360)/5}deg , white 0deg)`}} >
       <div id='ratingno' >
        <p style={{color:'black',fontWeight:'500'}} >{movie?.rating}</p>
       </div>
       </div> */}
       <p>{movie?.overview}</p>
       <p><b>Directed By: </b>{movie?.director}</p>
       </div></div>
      </div>
      <div className='reviews' >
       <h2>Reviews:</h2>
       <div className='reviewscontainer' >
       {
        movie?.reviews?.length===0 ? <p>Be the first one to review.</p> : movie?.reviews?.map(
          review => <ReviewCard review={review} />
        )
       }
       </div>
      </div> </>: <img src='images\loading.gif' alt='loading' />
    }
      
    </div>
  )
}

function ReviewModal(){
  const movie=useSelector(state => state?.movie)
  const user= useSelector(state => state?.user)
  const [ratingg,setrating]=useState(5)
  const [moviereview,setmoviereview]=useState("")
  const [oneword,setoneword]=useState("")

  const PostReview=()=>{
    const avgrating=((movie.rating * movie.reviews.length)+ratingg)/(movie.reviews.length+1)
    const review={
      username:`${user.fname} ${user.lname}`,
      userid:user._id,
      rating:ratingg,
      title:oneword,
      review:moviereview,
      movieid:movie._id
    }
    const newmovie={
      bg_poster:movie.bg_poster,
      title:movie.title,
      director:movie.director,
      overview:movie.overview,
      poster:movie.poster,
      rating:avgrating,
      year:movie.year,
      reviews:[...movie.reviews,review]
    }
    actions.UpdateMovie(newmovie,movie._id)
  //  actions.addReview(review)
  }

  return(
    <div>
      
      <button type="button" class="btn btn-outline-success" id='addreviewbtn' data-bs-toggle="modal" data-bs-target="#addreview">
      Add a Review
      </button>
      
      <div class="modal fade" id="addreview" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content bg-dark text-light">
      <div class="modal-header text-light">
       <h5 class="modal-title" id="exampleModalLabel">Type your Review</h5>
       <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style={{backgroundColor:'#222',color:'#fff'}}>
       <label htmlFor='rating' >Your Rating:
        <ReactStars 
        value={ratingg}
        count={5}
        onChange={setrating}
        id='rating'
        isHalf={true}
        size={40}
        activeColor="#ffd700"
        />
       </label>
       <label htmlFor='formonereview' >One Word Review:<br/>
        <input type='text' value={oneword} onChange={(e)=> setoneword(e.target.value) } id='formonereview' ></input>
       </label>
       <label htmlFor='formreview' >Review:
        <textarea className='form-control' value={moviereview} onChange={(e)=> setmoviereview(e.target.value) } id='formreview' ></textarea>
       </label>
      </div>
      <div class="modal-footer text-light">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
       <button type="button" class="btn btn-primary" onClick={PostReview}>Post</button>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default MovieDetails
