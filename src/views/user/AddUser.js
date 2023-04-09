import React, { Fragment, useState, useEffect } from 'react'

import { useNavigate,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {TextField, Button} from "@mui/material";
// import MetaData from '../layouts/MetaData'
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

  


    
    //   const { name, email, password } = user;
      const [avatar, setAvatar] = useState("");

      const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpg"
      );

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [dateOfBirth, setDateOfBirth] = useState('')
    // const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const navigate = useNavigate()



    const { loading, error, success } = useSelector(state => state.newUser);

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



    const submitHandler = (e) => {

        e.preventDefault();
        // notifys('User created successfully');

    const formData = new FormData();
    formData.set("name", name);
    
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);


    for (var [key, value] of formData.entries()) { 
        console.log(key, value);
       }

    dispatch(newUser(formData))

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
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };

    return (

        

        <React.Fragment>
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"/>
        <form onSubmit={submitHandler} encType='multipart/form-data'>
            <h2>Add User</h2>
                <TextField 
                    label="Name"
                    name="name"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    sx={{mb: 3}}
                    fullWidth
                 />
                  <TextField 
                    label="Email"
                    name="email"
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    sx={{mb: 3}}
                    fullWidth
                 />
                 <TextField 
                    label="Password"
                    name="password"
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 
                    
                 

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
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
                
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
             
        </form>
       
        </React.Fragment>

    )

}

export default AddUser
