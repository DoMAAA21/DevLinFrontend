import { useState,useEffect } from 'react';

import { useNavigate ,useLocation} from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../layouts/Loader";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import { login, clearErrors } from '../../../actions/userActions';
import { register, clearErrors } from '../../../actions/userActions'


// ----------------------------------------------------------------------

export default function RegisterForm() {



  const notify = (message = "") =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });


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

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
})

const { name, email, password } = user;

const [avatar, setAvatar] = useState('')
const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

// const alert = useAlert();
const dispatch = useDispatch();
const navigate = useNavigate()

const { isAuthenticated, error, loading } = useSelector(state => state.auth);

useEffect(() => {

    if (isAuthenticated) {
        navigate('/')
    }

    if (error) {
        // alert.error(error);
        dispatch(clearErrors());
    }

}, [dispatch, isAuthenticated, error, navigate])

const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);

    dispatch(register(formData))
}

const onChange = e => {
    if (e.target.name === 'avatar') {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    } else {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
}


const [showPassword, setShowPassword] = useState(false);


 

  return (
    <>
     <form onSubmit={submitHandler}>
      <Stack spacing={3}>


      <TextField name="name"
         label="Name"
         value={name}
         onChange={onChange}
        
        />
        <TextField name="email"
         label="Email address"
         value={email}
         onChange={onChange}
        
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

<div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Submit
      </LoadingButton>
      </form>
    </>
  );
}
