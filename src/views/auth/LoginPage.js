import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react'
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography, Divider, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom'
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
// sections
// import { LoginForm } from '../../sections/auth/login';
import { LoginForm } from './Login';
// import { GoogleLog } from './GoogleLogin';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { googlelogin } from 'src/actions/userActions';
import { useDispatch, useSelector } from "react-redux";
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {

  const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        // console.log(res)
                        setProfile(res.data);
                        dispatch(googlelogin(res.data));
                        // console.log(res.data)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };

  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | DevLin </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to DevLin
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link to="/register" >Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth onClick={() => login()} size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>


    
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

