import React from 'react'
import { useSelector } from 'react-redux'
import StarRatings from 'react-star-ratings'
import ReactStars from "react-rating-stars-component"


function ReviewCard(props) {
  const { username,rating,title,review,userid }=props.review
  const admin=useSelector(state => state?.admin)
  const user=useSelector(state => state?.user)

  const deleteReview=()=>{
    
  }
  return (
    <div class="card bg-dark text-white mb-3" style={{width:'40%'}} >
  <div class="card-header">
    <div style={{display:'flex'}} >
    <h5 class="card-title mb-0" style={{width:'98%',fontSize:'1.5rem',alignContent:'center'}} >{title}</h5>
    {
      admin || user?._id===userid ? <button className='btn btn-danger'  onClick={()=>deleteReview()} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
    </svg><i class="bi bi-trash"></i></button> : null
    }
    
    </div>
    <small>Review by <b>{username}</b></small>
  </div>
  <div class="card-body" style={{padding:'0 5% 5% 5%'}}  >
    <ReactStars
    count={5}
    value={rating}
    edit={false}
    size={24}
    activeColor="#ffd700"
    />
    <p class="card-text">{review}</p>
  </div>
  </div>


  )
}

export default ReviewCard
