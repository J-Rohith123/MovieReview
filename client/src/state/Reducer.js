
import React from 'react'

const initialState={
    user:{},
    users:[{}],
    movies:[{}],
    movie:{},
    loggedIn:false,
    reviews:[],
    admin:false
}

function MoviesReducer(state=initialState,action) {
  switch(action.type){
    case 'getmovies': return {...state,movies:[...action.payload]}

    case 'getusers': return {...state,users:[...action.payload]}

    case 'addUser': return {...state,users:[...state.users,{...action.payload}]}

    case 'addmovie': return {...state,movies:[...state.movies,{...action.payload}]}

    case 'deletemovie': return {...state,movies:[...state.movies.filter(i => i._id!=action.payload)]}

    case 'updateMovie': return {...state,movies:[...state.movies.filter(i=> i._id!=action.payload._id),{...action.payload}]}

    case 'setuser': return {...state,user:{...action.payload},loggedIn:true,admin:action.payload.admin}

    case 'logout': return {...state,user:{},loggedIn:false}

    case 'updateuser': return {...state,user:{...action.payload}}

    case 'addreview': return {...state,reviews:[...state.reviews,action.payload]}

    case 'setreviews': return {...state,reviews:[...action.payload]}

    case 'getmovie': return {...state,movie:{...action.payload}}

    case 'changelook': return {...state,admin:!action.payload}

    case 'deletereview': return {...state,reviews:[...state.reviews.filter(i => i._id!=action.payload)]}

    default : return state
  }
}

export default MoviesReducer
