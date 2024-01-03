import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from "../helper/AuthContext";





function Profile() {
 const [usename, setUsername] = useState('');
 const [listOfPosts, setlistOfPosts] = useState([]);
 const navigate = useNavigate();
 const {authState} = useContext(AuthContext);

 

    const {id} = useParams();


    useEffect(()=> {
        axios.get(`http://localhost:3011/auth/basicinfo/${id}`).then((res)=> {
            setUsername(res.data.Username)

        })
        axios.get(`http://localhost:3011/post/byuserId/${id}`).then((res)=> {
            setlistOfPosts(res.data)

        })

    },[])
   

 return (
  <div className=' container  mt-5 text-center  '> 

  <h2>username : {usename}</h2>
  <div>


  {listOfPosts.map((val, key) => {
return (
<div className='main' key={val.id}  >
  <h2 className='title'>{val.title}</h2>
  <h2 className='text' onClick={()=>{
    navigate(`/post/${val.id}`)

}}>{val.PostsText}</h2>
  <div  className='user' ><h2>{val.Username}  </h2> 
  <div>
  <span className='text-light fs-5 fw-bold ms-2'>{val.Likes.length}</span></div></div>
</div>
 )         
})}
  </div>
    
      

 
  </div> 
);
}

export default Profile;
