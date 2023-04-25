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

import { login, clearErrors } from '../../../actions/userActions';


// ----------------------------------------------------------------------

export default function LoginForm() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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





  let location = useLocation();
  const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '' 

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (isAuthenticated && redirect === "shipping") {
      // navigate(redirect.get('redirect'), {replace: true})
      notifys('Logged In');
      navigate(`/${redirect}`, { replace: true });

    
    } 
    else if (isAuthenticated && redirect === "serviceshipping") {
      // navigate(redirect.get('redirect'), {replace: true})
      notifys('Logged In');
      navigate(`/${redirect}`, { replace: true });

    
    } 

    
    
    else if (isAuthenticated) navigate("/");

    if (error) {
      notify(error);

      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);


  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
     <form onSubmit={submitHandler}>
      <Stack spacing={3}>
        <TextField name="email"
         label="Email address"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
      </form>
    </>
  );
}
