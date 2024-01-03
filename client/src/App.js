import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Rejester from './pages/Regestr';
import Login from './pages/Login';
import { AuthContext } from './helper/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagenotefound from  "./pages/Pagenotefound"
import Profile from './pages/Profile';
function App() {

  const [authState, setAuthState] = useState({
    username:"",
    id : 0,
    status : false,
  });

  useEffect(()=> {
    axios.get("http://localhost:3011/auth/auth",{  headers:{
      accessToken : localStorage.getItem("accessToken") }
    }).then((res)=>{
      if(res.data.error){
        setAuthState({
          username:"",
          id : 0,
          status : false,
           });
      }else{
        setAuthState({
          username: res.data.Username,
          id : res.data.id,
          status: true,
        });
      }

    })

  },[])

  const logOut = () => {
    localStorage.removeItem("accessToken");

    setAuthState({
      username:"",
      id : 0,
      status : false,
       });

  }
 

 return (
  <div className='app '>
    <AuthContext.Provider value={ {authState , setAuthState}}>
  <Router>
    
    <div className='navb   bg-warning ps-2 pb-2 pe-2'>
      <div className='fs-2 fw-bold'>Tutorial Mrn</div>
      <div >
  
  {! authState.status ? (
    <>
    <Link to={'/regester'}><button className='btn btn-success fs-2 text-center mt-3 ms-3'>Rejester </button></Link>
    <Link to={'/'}><button className='btn btn-primary fs-2 text-center mt-3 ms-3'>LogIn </button></Link>

</>
  ) : (
    <>
    <Link to={'/createposts'}><button className='btn btn-info fs-2 text-center mt-3'>Create Posts </button></Link>
  <Link to={'/home'}><button className='btn btn-danger fs-2 text-center mt-3 ms-3'>Go Home </button></Link>
    
<button className='btn btn-danger fs-2 text-center mt-3 ms-3' onClick={logOut}>LogOut </button> 
<span className='text-pramary p-2 fw-bold'> Hi,  {authState.username}</span>



</>


)}






  </div >
  </div >





    <Routes>
    <Route path='/home'  element={<Home/>}/>
    <Route path='/createposts'  element={<CreatePost/>}/>
    <Route path='/post/:id'  element={<Post/>}/>
    <Route path='/regester'  element={<Rejester/>}/>
    <Route path='/'  element={<Login/>}/>
    <Route path='/profile/:id'  element={<Profile/>}/>
    <Route path='*'  element={<Pagenotefound/>}/>
    </Routes>
  </Router>
  </AuthContext.Provider>
  </div> 
);
}

export default App;
