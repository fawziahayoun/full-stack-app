import {useContext, useEffect,useState} from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import './Post.css';
import { AuthContext } from "../helper/AuthContext";
import { FaHeart} from "react-icons/fa";


export default function Post(){
    const {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [listOfLikes, setlistOfLikes] = useState([]);

    const [commentsu, setComments] = useState([]);
    const [nweComment, setnweComment] = useState([]);
    const navigate = useNavigate();

    const {authState} = useContext(AuthContext);



    useEffect(()=> {

        axios.get(`http://localhost:3011/post/byId/${id}`
        ,{ headers: { accessToken : localStorage.getItem("accessToken")}}).then((res)=>{
          setPostObject(res.data.post); 
          setlistOfLikes(res.data.likedPosts.map((like)=> {
            return like.PostId;
          }));       
        });
        

        axios.get(`http://localhost:3011/comments/${id}`).then((res)=>{
          setComments(res.data);
        
        });

        
        
          } , []);
          const likesPost = (PostId) => {
            axios.post("http://localhost:3011/likes", {PostId : PostId}, 
            {headers: { accessToken : localStorage.getItem("accessToken")}}).then((res) => {

             if(listOfLikes.includes(PostId)){
              setlistOfLikes(listOfLikes.filter((id) => {
                 return id != PostId
              }))
          
             }else{
              setlistOfLikes([...listOfLikes, PostId])
          
             }
          
            
          
            })
          
           }


          const addComment = () => {
            axios.post("http://localhost:3011/comments",{ CommentBody:nweComment , PostId:id}
            ,{
          headers:{
            accessToken : localStorage.getItem("accessToken")
          },


            }).then((res)=> {
                if(res.data.error){
                    alert(res.data.error)

                }else{
                    const commentAdded = {CommentBody: nweComment, Username : res.data.Username}

                    setComments([...commentsu, commentAdded] )
        
                    setnweComment("");

                }

           

            })
          };

          const deleteComments = (id) => {
            axios.delete(`http://localhost:3011/comments/${id}`,{ 
                 headers: {
                accessToken : localStorage.getItem("accessToken") },
              })
              .then(()=>{
              setComments ( commentsu.filter((val)=>{
                  return  val.id !== id;
                })
                );

              });

          };


          const DeletePost = (id) => {
            axios.delete(`http://localhost:3011/post/postId/${id}`
            ,{ headers: { accessToken : localStorage.getItem("accessToken")}},
             ).then(() => {

                navigate("/home");

             })

          }
        
          const updatepost = (option) =>{
            if(option === "title"){
                const nweTitle = prompt("Enter You Title : ")

                axios.put("http://localhost:3011/post/title",{ nweTitle : nweTitle, id : id},
                { headers: { accessToken : localStorage.getItem("accessToken")}}).then((res) => {

                    setPostObject({...postObject, title: nweTitle})

                })

            }else{

                const nweText = prompt ("Enter your Text : ")
                axios.put("http://localhost:3011/post/text",{ nweText : nweText, id : id},
                { headers: { accessToken : localStorage.getItem("accessToken")}}).then((res) => {
                    setPostObject({...postObject, PostsText: nweText})

                    
                })

            }
          }
           

return(
 <div className=" bg-dark post">
    <div className="row container ">
        <div className="first col-6 mt-5">

            <div className="title fs-3" 
              
             >{postObject.title}   {authState.username == postObject.Username && 
                <button className="btn btn-warning fw-bold" onClick={()=> {updatepost("title")}}>change</button>}</div>
            <div className="text fs-3"  >{postObject.PostsText} {authState.username == postObject.Username && 
                <button className="btn btn-warning fw-bold" onClick={()=> {updatepost("text")}}>change</button>}</div>
            <div className="user fs-3 fw-bold">{postObject.Username} <div><button  onClick={()=> {likesPost(postObject.id)}}>
  {listOfLikes.includes(postObject.id) ? <  FaHeart  fontSize={'25px'} color='red' /> : <  FaHeart fontSize={'25px'} color='black' />}
     </button> 
  <span className='text-light fs-5 fw-bold ms-2'></span></div> {authState.username == postObject.Username && 
            <button className="buttons btn btn-danger ms-2 "  onClick={() => {DeletePost(postObject.id)}}>Delete Post</button>}</div>

        </div>

        <div className="col-6 fs-3 mt-5 text-center ">

   <div><input type="text" placeholder="comment..." value={nweComment} 
   onChange={(e)=> {setnweComment(e.target.value)}}/> 
   <button className="button btn btn-warning" onClick={addComment}>Add</button></div>


   <div>



   </div>



   {commentsu.map((comments, key) => {
return (
<div className='perant' key={key} >
  <div className='comment '><h2 className="text-info m2-1">  {comments.Username} : </h2> <span className="ms-1"> {comments.CommentBody} </span>  
  {authState.username === comments.Username && <button onClick={() => {deleteComments(comments.id)}} className="btn btn-danger ms-2">Delete</button>}

</div>

  
</div>
 ) ;        
})}




        </div>


  

    </div>
    </div>
)

}