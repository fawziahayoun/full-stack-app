import { useState, useContext } from 'react';
import './CreatePosts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helper/AuthContext';


function Login() {
    const navigate =useNavigate();
    const {setAuthState} = useContext(AuthContext)
    

    const [Username , setUsername] = useState('');
    const [Password , setPassword] = useState('');




    const onSubmit=(e)=> {
        e.preventDefault()

        const data = {Username : Username , Password: Password};

        axios.post("http://localhost:3011/auth/login", data).then((res)=>{

            if(res.data.error){

                alert(res.data.error)
            } else{
                navigate('/home')

                localStorage.setItem("accessToken", res.data.token);
                setAuthState({
                    username:res.data.Username,
                    id : res.data.id,
                    status : true,
                     });


            }
          
          }) ; 
          }

 return (
  <div className=' container  mt-5 text-center  '> 
    
      <form className=' create pt-5 mt- pb-5'  action=''  >
  <div className="mb-3  ">
    <label htmlFor="exampleInputNmae1" className="form-label  rounded-0">Your Name</label>
    <input type="text" className="form-control rounded-0 w-100 input" id="exampleInputName" name='Username'
    placeholder='inter your nmae' onChange={(e)=>{setUsername(e.target.value)}} />
 </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label ">Your Password</label>
    <input type="password" className="form-control rounded-0 w-100 input" id="exampleInputPassword1"
     name='password' placeholder='inter your password' 
     onChange={(e)=>{setPassword(e.target.value)}} minLength='6' maxLength='15' />

  </div>
  <button className='btn btn-success' onClick={onSubmit}>LogIn</button>


</form>

 
  </div> 
);
}

export default Login;
