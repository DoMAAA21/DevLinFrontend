import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../layouts/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import {TextField, Button,Select,InputLabel,MenuItem} from "@mui/material";
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';



const UpdateUser = () => {

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')

    const [role, setRole] = useState('')

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { error, isUpdated } = useSelector(state => state.user);

    const { user } = useSelector(state => state.userDetails)

    const {id} = useParams();

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });



    useEffect(() => {

        // console.log(user && user._id !== userId);

        if (user && user._id !== id) {

            dispatch(getUserDetails(id))

        } else {

            setName(user.name);

            setEmail(user.email);

            setRole(user.role)

        }



        if (error) {

            errMsg(error);

            dispatch(clearErrors());

        }



        if (isUpdated) {

           successMsg('User updated successfully')

            navigate('/dashboard/users')

            dispatch({

                type: UPDATE_USER_RESET

            })

        }

    }, [dispatch, error, navigate, isUpdated, id, user])



    const submitHandler = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);

        formData.set('email', email);

        formData.set('role', role);

        // for (var [key, value] of formData.entries()) { 
        //     console.log(key, value);
        //    }

        dispatch(updateUser(user._id, formData))

    }

    return (

        <React.Fragment>
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"/>
        <form onSubmit={submitHandler} encType='multipart/form-data'>
            <h2>Update User</h2>
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
               

                <InputLabel >Role</InputLabel>
                <Select
                label="Role"
                name="role" 
                required 
                    value={role}
                    variant="outlined"
                    color="primary"
                    onChange={e => setRole(e.target.value)}
                    fullWidth         
                    sx={{mb: 3}}
                >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                
                </Select>
                 
                 
                    
                 


                
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
             
        </form>
       
        </React.Fragment>
    )

}



export default UpdateUser

