import './CreatePosts.css';
import{Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from 'axios';


function Rejester() {

    

    const initialValues = {
        Password:"",
        Username:"",
    };
    const validationSchema= Yup.object().shape({
        
        Username: Yup.string().min(3).max(15).required(),
        Password: Yup.string().min(3).max(15).required(),



    });

    const onSubmit=(data)=> {
        axios.post("http://localhost:3011/auth", data).then((res)=>{
          
          })  
          }

 return (
  <div className=' container mt-5 text-center  '>
<Formik initialValues={initialValues} onSubmit={onSubmit}    validationSchema={validationSchema}>
  <Form className='create'>
    
    <label className='d-block'>Username:  </label>
    <ErrorMessage className='text-danger' name='Username' component='span'/>
    <Field className='input d-block' autoComplete='off' id="inputCreateUsername" name="Username" placeholder='(ex fawzi... )' />

    <label className='d-block'>Password:  </label>
    <ErrorMessage className='text-danger' name='Password' component='span'/>
    <Field className='input d-block' type='password' autoComplete='off' id="inputCreatePassword" name="Password" placeholder='Your Password' />

    <button className='btn btn-success d-block mt-3' type="submit"> Rejester</button>

    </Form>   
    </Formik> 
  </div> 
);
}

export default Rejester;
