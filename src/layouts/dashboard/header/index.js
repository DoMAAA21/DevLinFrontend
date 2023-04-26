import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton,Typography } from '@mui/material';
import { Link } from "react-router-dom";
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';

import { FaShoppingBag } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Search from './Search'
import { useDispatch, useSelector } from "react-redux";



// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {

  const dispatch = useDispatch();
  
  const { cartItems } = useSelector(state => state.cart)
  const { scartItems } = useSelector(state => state.scart)
  
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <StyledRoot>
      <StyledToolbar>
    
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          {/* <Iconify icon="eva:menu-2-fill" /> */}
        </IconButton>

        <Search />
        <Typography color="primary" component={Link} to="/shop" style={{ textDecoration: "none" }} >Home</Typography>
        <Box sx={{ flexGrow: 0.05 }} />
        <Typography color="primary" component={Link} to="/services" style={{ textDecoration: "none" }} >Services</Typography>
        <Box sx={{ flexGrow: 0.05 }} />
        <Typography color="primary" component={Link} to="/build-a-pc" style={{ textDecoration: "none" }} >Pc Builder</Typography>
       
        <Box sx={{ flexGrow: 0.05 }} />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Typography>Home</Typography>

<Link to="/cart" style={{ textDecoration: "none" }}>
           
           <FaShoppingBag/>

           {cartItems.length}
 
         </Link>

         <Link to="/servicecart" style={{ textDecoration: "none" }}>
           <FaWrench/>

          {scartItems.length}
          
         </Link>

           

            
          
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
