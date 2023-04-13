import React, { useEffect, useState } from 'react'
import {  redirect, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import '../CSS/moviedetails.css'
import StarRatings from 'react-star-ratings'
import ReviewCard from './ReviewCard'
import * as actions from '../state/actions'



function MovieDetails() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const id=useLocation().state
   const movie=useSelector(state => state?.movie)
   const loggedin=useSelector(state => state?.loggedIn)
   const reviews=useSelector(state => state?.reviews)
   useEffect(()=>{
     dispatch(actions.getOneMovie(id))
     dispatch(actions.getReviews(id))
     if(id==null){
      navigate('/')
     }
   },[id])
   useEffect(()=>{
     console.log(reviews)
   },[reviews])
   
  return (
    <div className='container' id='details_container'  >
      {
         loggedin? <ReviewModal /> : null
      }
       
    {/* remaining code */}
      <div className='bg_pic' style={{backgroundImage:`url(${movie?.bg_poster})`}} ></div>
      <div className='main_content' >
        <div className='bg_content'></div>
        <div className='card' id='poster' >
       <img src={movie?.poster} alt='poster'  ></img></div>
       <div className='container' >
       <div className='card' id='details' >
       <div className='bg_details'></div>
       <h3 style={{width:'fit-content',color:'#fffc0f'}} >{movie?.title}({movie?.year})</h3>
       <p>{movie?.rating}⭐</p>
       <p>{movie?.overview}</p>
       <p><b>Directed By: </b>{movie?.director}</p>
       </div></div>
      </div>
      <div className='reviews' >
       <h2>Reviews:</h2>
       <div className='reviewscontainer' >
       {
        reviews?.length==0 ? <p>Be the first one to review.</p> : reviews?.map(
          review => <ReviewCard review={review} />
        )
       }
       </div>
      </div>
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
      rating:movie.rating,
      year:movie.year,
      reviews:[...movie.reviews,{...review}]
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
        <StarRatings
        rating={ratingg}
        starRatedColor='gold'
        changeRating={setrating}
        numberOfStars={5}
        name='rating'
        id='rating'
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
