import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import { logout } from "../../../actions/userActions";
import { toast } from "react-toastify";
// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const notify = (message = "") =>
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

  const { user, loading } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());

    navigate('shop')

    notify("Logged Out Successfully");
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {user ? (
        <Avatar src={user.avatar && user.avatar.url} alt="photoURL" />
        ) : (
          (
            <Avatar src={account.photoURL} alt="photoURL" />
            )
            )}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
          {user && user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {user && user.email}
          </Typography>
        </Box>


        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <Stack sx={{ p: 1 }}>
         

          {user && user.role === "admin" && (
                        
              <MenuItem component={Link} to="/dashboard/app" >
              Dashboard
              </MenuItem> 
                          )}


                 

                

                  {user ? (
                   <>



                    <MenuItem  key="order" component={Link} to="/me/orders" >
                    Order
                    </MenuItem> 

                    <MenuItem  key="profile" component={Link} to="/me" >
                    Profile
                    </MenuItem> 
                                  
                    <Divider sx={{ borderStyle: 'dashed' }} />
                   <MenuItem onClick={logoutHandler} sx={{ m: 1 }}>
                    Logout
                  </MenuItem> 
                  </>

          ) : (
              (
              // <Link to="/login"  id="login_btn">
              //   Login
              // </Link>

              <MenuItem component={Link} to="/login" sx={{ m: 1 }}>
            Login
            </MenuItem> 
            )
          )}

                </Stack>
        
      </Popover>
    </>
  );
}
