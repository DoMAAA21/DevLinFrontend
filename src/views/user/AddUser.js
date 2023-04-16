import React, { Fragment, useState, useEffect } from 'react'

import { useNavigate,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {TextField, Button,Box} from "@mui/material";
import { useForm } from "react-hook-form";
import MetaData from '../layouts/MetaData'
import {  newUser ,clearErrors } from '../../actions/userActions'
import { NEW_USER_RESET } from '../../constants/userConstants'

const notifys = (message = "") =>
toast.success(message, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});


const AddUser = () => {


    
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
      const [avatar, setAvatar] = useState("");

      const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpg"
      );


  

    const dispatch = useDispatch();

    const navigate = useNavigate()



    const { loading, error, success } = useSelector(state => state.newUser);
 
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm(
      { mode:"onChange",
       defaultValues:
       {
        name: name,
        email: email,
        password: password

       }

      }
    );

    const message = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {



        if (error) {

            dispatch(clearErrors())

        }

        if (success) {

            navigate('/dashboard/users');

            message('User created successfully');

            dispatch({ type: NEW_USER_RESET })

        }



    }, [dispatch, error, success,navigate])



    const submitHandler = (data) => {

      
    
        const userData = {

          name : data.name,
          email : data.email,
          password :data.password,
          avatar : avatar
        }

    dispatch(newUser(userData))

    }

    const onChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setName({ [e.target.name]: e.target.value });
        }
      };

    return (

        

        <React.Fragment>
            <MetaData title={"Add User"} />
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"/>
        <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
            <h2>Add User</h2>
                <TextField 
                    label="Name"
                    name="name"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    sx={{mb: 3}}
                    fullWidth
                    {...register("name", {
                      required: "Name is required."
                    })}
                    
                 />
                  {errors.name && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.name.message}</Box>}

                  <TextField 
                    label="Email"
                    name="email"
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                   
                    sx={{mb: 3}}
                    fullWidth
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid."
                      }
                    })}
                 />

              {errors.email && <Box component="div" sx={{ display: 'block' , color:'red'}}>{errors.email.message}</Box>}
                 
                 <TextField 
                    label="Password"
                    name="password"
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
               
                    fullWidth
                    sx={{mb: 3}}
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 6,
                        message: "Password should be at-least 6 characters."
                      }
                    })}
                 />
                  {errors.password && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.password.message}</Box>}
                 
                    
                 

<div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="w-25 p-3">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                     
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
        
                   required
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
            {errors.image && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.image.message}</Box>}
                
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
             
        </form>
       
        </React.Fragment>

    )

}

export default AddUser
