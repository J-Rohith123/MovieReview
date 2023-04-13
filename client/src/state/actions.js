import axios from "axios";
import Cookies from 'js-cookie'


export function getMovies(){
    return(dispatch)=>{
        axios.get("http://localhost:3001/movies")
        .then(res => {
            dispatch({type:'getmovies',payload:res.data})
        })
    }
    
}

export function getUsers(){
    return(dispatch)=>{
        axios.get("http://localhost:3001/users")
        .then(res => {
            dispatch({type:'getusers',payload:res.data})
        })
    }
    
}

export function addUser(val){
    return(dispatch)=>{
        axios.post("http://localhost:3001/users",val)
        .then(res => dispatch({type:'addUser',payload:val}))
        .catch(err => console.log(err))
    }
}
export function addMovie(val){
    return(dispatch)=>{
        axios.post("http://localhost:3001/movies",val)
        .then(res => dispatch({type:'addmovie',payload:val}))
        .catch(err => console.log(err))
    }
}
export function deleteMovie(id){
    return(dispatch)=>{
        axios.delete(`http://localhost:3001/movies/${id}`)
        .then(res => dispatch({type:'deletemovie',payload:id}))
        .catch(err => console.log(err))
    }
}
export function setUser(id){
    
    return(dispatch)=>{
        axios.get(`http://localhost:3001/users/${id}`)
        .then(res =>{ 
            Cookies.set("LoggedUser",id)
            dispatch({type:'setuser',payload:res.data})
        })
        .catch(err => console.log(err))
     }
}
export function getOneMovie(id){
    
    return(dispatch)=>{
        axios.get(`http://localhost:3001/movies/${id}`)
        .then(res =>{ 
            dispatch({type:'getmovie',payload:res.data})
        })
        .catch(err => console.log(err))
     }
}
export function loggedOut(){
    
    Cookies.remove('LoggedUser')
    return (dispatch)=>{
        dispatch({type:'logout'})
    }
}
export function addReview(review){
    console.log(review)
    return(dispatch)=>{
      axios.post('http://localhost:3001/reviews',review)
      .then(res => dispatch({type:'addreview',payload:{...review}}))
      .catch(err => console.log("error: ",err))
    }
}
export function getReviews(mid){
    return(dispatch)=>{
        axios.get(`http://localhost:3001/reviews/${mid}`)
        .then(res => dispatch({type:'setreviews',payload:res.data}))
        .catch(err => console.log("error: ",err))
    }
}
export function UpdateMovie(movie,id){
    
    return(dispatch)=>{
        axios.put(`http://localhost:3001/movies/${id}`,movie)
        .then(res => dispatch({type:'updateMovie',payload:res.data}))
        .catch(err => console.log("error: ",err))
    }
}

export function UpdateUser(user,id){
    
    return(dispatch)=>{
        axios.put(`http://localhost:3001/users/${id}`,user)
        .then(res => dispatch({type:'updateuser',payload:res.data}))
        .catch(err => console.log("error: ",err))
    }
}

export function deleteReview(id){
    return(dispatch)=>{
        axios.delete(`http://localhost:3001/reviews/${id}`)
        .then(res => dispatch({type:'deletereview',payload:id}))
        .catch(err => console.log(err))
    }
}
export function changeLook(val){
    return(dispatch)=>{
        dispatch({type:'changelook',payload:val})
    }
}