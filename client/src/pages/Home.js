import { useEffect, useState,useContext } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FaHeart} from "react-icons/fa";


import '../App.css';
import axios from 'axios';

function Home() {
    const navigate =useNavigate();
  const [listOfPosts, setlistOfPosts] = useState([]);
  const [listOfLikes, setlistOfLikes] = useState([]);




  useEffect(()=> {

    if(!localStorage.getItem("accessToken")){
      navigate("/")
    }else{

    
axios.get("http://localhost:3011/post",
 {headers: { accessToken : localStorage.getItem("accessToken")}}).then((res)=>{
  setlistOfPosts(res.data.getPosts);
  setlistOfLikes(res.data.likedPosts.map((like)=> {
    return like.PostId;
  }));
  console.log(res.data.likedPosts);

}) }

  }
 ,[]);

 const likesPost = (PostId) => {
  axios.post("http://localhost:3011/likes", {PostId : PostId}, 
  {headers: { accessToken : localStorage.getItem("accessToken")}}).then((res) => {
    setlistOfPosts(listOfPosts.map((Post) => {
    if(Post.id === PostId){
      if(res.data.Likes){
       return ({...Post,Likes : [...Post.Likes, 0]})

      }else{
        const likesArray = Post.Likes;
        likesArray.pop();
       return ({...Post,Likes : likesArray})


      }

    }else{
      return Post;
    }

    }) )
   // alert(res.data);
   if(listOfLikes.includes(PostId)){
    setlistOfLikes(listOfLikes.filter((id) => {
       return id != PostId
    }))

   }else{
    setlistOfLikes([...listOfLikes, PostId])

   }

  })

 }

 return (
  <div className='app'>
  {listOfPosts.map((val, key) => {
return (
<div className='main' key={val.id}  >
  <h2 className='title'>{val.title}</h2>
  <h2 className='text' onClick={()=>{
    navigate(`/post/${val.id}`)

}}>{val.PostsText}</h2>
  <div  className='user' ><h2> <Link className='text-decoration-none' to={`/profile/${val.UserId}`}>{val.Username}</Link>  </h2> 
  <div><button  onClick={()=> {likesPost(val.id)}}>
  {listOfLikes.includes(val.id) ? <  FaHeart fontSize={'25px'} color='red' /> : <  FaHeart fontSize={'25px'} color='black' />}
     </button> 
  <span className='text-light fs-5 fw-bold ms-2'>{val.Likes.length}</span></div></div>

  


  
</div>
 )         
})}
  </div> 
);
}

export default Home;
