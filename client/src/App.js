import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import RegistrationForm from './components/Register';
import SigninForm from './components/Login';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './state/actions'
import Profile from './components/Profile';
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/loading'
import Footer from './components/Footer';
import Loadingprac from './components/Loadingprac';

function App() {
  const [searchmovie,setsearchmovie]=useState("")
  const user=useSelector(state => state?.user)
  const dispatch=useDispatch()
  const scrollpos=useRef()
  const scrollbtn=useRef()
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },500)
  },[])

  const scrollUp=()=>{
    scrollpos.current.scrollIntoView()
  }

  const showscrollbutton=()=>{
       
       if(scrollbtn.current?.style!==undefined){
          if(document.documentElement.scrollTop >= 200){
              scrollbtn.current.style.visibility='visible'
           }else{
              scrollbtn.current.style.visibility='hidden'
            }
       }
    
  }

  useEffect(()=>{
   
   dispatch(actions.getUsers())

   let currentUser = Cookies.get('LoggedUser')
    if(currentUser !== undefined) {
    
      dispatch(actions.setUser(currentUser))
    
    }
  },[])
   
document.addEventListener("scroll",showscrollbutton)

  return (
    <div className="App">
     {
      <button type='button' className='btn btn-dark text-light' style={{position: 'fixed'}} id='scrolltotop' ref={scrollbtn} onClick={scrollUp} ><i class="bi bi-arrow-up"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
    </svg></i></button>
     }
      
      <div id='scrollpos' style={{position:'absolute'}} ref={scrollpos}  ></div>
    <BrowserRouter>
    <NavBar username={user?.fname} searchmovie={searchmovie} setsearchmovie={setsearchmovie} />
    <Routes>
      <Route path='/loadingprac' element={<Loadingprac/>} ></Route>
      <Route path='/' element={loading? <Loading/> : <Home/>} />
      <Route path='/movies' element={loading? <Loading/> : <Movies searchmovie={searchmovie} />} />
      <Route path='/movies/:id' element={loading? <Loading/> : <MovieDetails/>} />
      <Route path='/signin' element={loading? <Loading/> : <SigninForm/>} />
      <Route path='/register' element={loading? <Loading/> : <RegistrationForm/>} />
      <Route path='/profile' element={loading? <Loading/> : <Profile/>} />
    </Routes>
    <Footer/>
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
