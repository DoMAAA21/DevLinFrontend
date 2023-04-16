import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../layouts/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import {TextField, Button,Select,InputLabel,MenuItem,Box} from "@mui/material";
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
    console.log(user.email)

   

    

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
        role: role

       }

      }
    );

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

            setValue('name', user.name)
            setValue('email',user.email)
            setValue('role',user.role)

            // setName(user.name);

            // setEmail(user.email);

            // setRole(user.role)

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



    const submitHandler = (data) => {
        console.log(data)

      

        const userData = {

            name : data.name,
            email : data.email,
            role :data.role,
         
          }

        dispatch(updateUser(user._id, userData))

    }

    return (

        <React.Fragment>
              <MetaData title={"Update User"} />
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"/>
        <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
            <h2>Update User</h2>

            <InputLabel >Name</InputLabel>
                <TextField 
                   
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
                    setValue
                 />

            {errors.name && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.name.message}</Box>}   
                    <InputLabel >Email</InputLabel>
                  <TextField 
                
                    name="email"
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                 
                    sx={{mb: 3}}
                    fullWidth
                    setValue
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message: "Email is not valid."
                        }
                      })}
                 />
                   {errors.email && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.email.message}</Box>}
               

                <InputLabel >Role</InputLabel>
                <Select
                label="Role"
                name="role" 
                required 
                    variant="outlined"
                    color="primary"
                    onChange={e => setRole(e.target.value)}
                    fullWidth         
                    sx={{mb: 3}}
                     setValue
                    {...register("role", {
                        required: "Role is required."
                      })}
                >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                
                </Select>

                {errors.role && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.role.message}</Box>}
                 
                 
                    
                 


                
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
             
        </form>
       
        </React.Fragment>
    )

}



export default UpdateUser

