import express from 'express'
import * as moviecontrols from '../controllers/moviecontroller.js'

const movierouter=express.Router()

movierouter.get('/',moviecontrols.getMovies)

movierouter.get('/:id',moviecontrols.getOneMovie)

movierouter.post('/',moviecontrols.createMovie)

movierouter.delete('/:id',moviecontrols.deleteMovie)

movierouter.put('/:id',moviecontrols.updateMovie)



export default movierouter