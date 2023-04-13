import React from 'react'
import StarRatings from 'react-star-ratings'


function ReviewCard(props) {
  const { username,rating,title,review }=props.review

  const deleteReview=()=>{
    
  }
  return (
    <div class="card bg-dark text-white mb-3" style={{width:'80%'}} >
  <div class="card-header">
    <div style={{display:'flex'}} >
    <h5 class="card-title mb-0" style={{width:'98%'}} >{title}</h5>
    <button className='btn btn-outline-danger'  onClick={()=>deleteReview()} >Delete</button>
    </div>
    <small>Review by {username}</small>
  </div>
  <div class="card-body">
    <StarRatings
      rating={rating}
      starRatedColor='gold'
      numberOfStars={5}
      name='reviewrating'
      id='reviewrating'
    />&nbsp;<span style={{fontSize:'180%'}} >{rating}/5</span>
    <p class="card-text">{review}</p>
  </div>
  </div>


  )
}

export default ReviewCard
