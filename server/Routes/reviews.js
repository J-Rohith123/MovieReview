import express from "express";
import * as reviewcontrols from '../controllers/reviewcontroller.js'

const ReviewRouter=express.Router()


// ReviewRouter.get('/')

ReviewRouter.get('/:id',reviewcontrols.getReviews)

ReviewRouter.post('/',reviewcontrols.postReview)

ReviewRouter.delete('/:id',reviewcontrols.deleteReview)

export default ReviewRouter