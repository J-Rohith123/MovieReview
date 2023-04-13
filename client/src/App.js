import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import RegistrationForm from './components/Register';
import SigninForm from './components/Login';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './state/actions'
import Profile from './components/Profile';
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [searchmovie,setsearchmovie]=useState("")
  const user=useSelector(state => state?.user)
  const dispatch=useDispatch()
  useEffect(()=>{
   
   dispatch(actions.getUsers())

   let currentUser = Cookies.get('LoggedUser')
    if(currentUser !== undefined) {
    
      dispatch(actions.setUser(currentUser))
    
    }
  },[])
  
  return (
    <div className="App">
      
    <BrowserRouter>
    <NavBar username={user?.fname} searchmovie={searchmovie} setsearchmovie={setsearchmovie} />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/movies' element={<Movies searchmovie={searchmovie} />} />
      <Route path='/movies/:id' element={<MovieDetails/>} />
      <Route path='/signin' element={<SigninForm/>} />
      <Route path='/register' element={<RegistrationForm/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
    </BrowserRouter>
    <ToastContainer
    position='top-center'
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover={false}
    theme='dark'
    />
    </div>
  );
}

export default App;
