import './CreatePosts.css';
import{Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';




function CreatePost() {


  const navigate =  useNavigate();

    

    const initialValues = {
        title: "",
        PostsText:"",
    };

    useEffect(()=> {
      if(!localStorage.getItem("accessToken")){
        navigate("/")
      }

    },[])
    const validationSchema= Yup.object().shape({
        title: Yup.string().required(),
        PostsText: Yup.string().required(),


    });

    const onSubmit=(data)=> {
        axios.post("http://localhost:3011/post", data,{headers: { accessToken : localStorage.getItem("accessToken")}} ).then((res)=>{
            console.log('it worked');
            navigate('/home')
          
          })  
          }

 return (
  <div className=' container mt-5 text-center  '>
<Formik initialValues={initialValues} onSubmit={onSubmit}    validationSchema={validationSchema}>
  <Form className='create'>
    <label className='d-block'>Title:  </label>
    <ErrorMessage className='text-danger' name="title" component="span"/>
    <Field  className='input d-block  ' autoComplete='off' id="inputCreateTitle" name="title" placeholder='(ex Title... )' />
    <label className='d-block'>PostsText:  </label>
    <ErrorMessage className='text-danger' name="PostsText" component="span"/>
    <Field className='input d-block' autoComplete='off' id="inputCreatePost" name="PostsText" placeholder='(ex Post... )' />
    

    <button className='btn btn-success d-block mt-3' type="submit"> Create Post</button>

    </Form>   
    </Formik> 
  </div> 
);
}

export default CreatePost;
