import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import {  Link } from "react-router-dom";
import { ShoppingCart } from '@mui/icons-material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
import { FaShoppingCart } from 'react-icons/fa';
import { FaShoppingBag } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Search from './Search'
import { useDispatch, useSelector } from "react-redux";
import Cart from '../cart.svg'
import Logo from '../../../components/logo';
import { FcRadarPlot } from "react-icons/fc";
import { ImWrench } from "react-icons/im";
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;


const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `100%px`,
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

      <Box component={Link} to="/"  style={{ textDecoration: 'none' }} sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <FcRadarPlot size="2em" /> <Typography color="common.black" style={{ fontSize: 25 }}>DevLin</Typography>
      </Box>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Search/>
        <Typography color="primary" component={Link} to="/shop" style={{ textDecoration: "none" }} >Home</Typography>
        <Box sx={{ flexGrow: 0.05 }} />
        <Typography color="primary" component={Link} to="/services" style={{ textDecoration: "none" }} >Services</Typography>
        <Box sx={{ flexGrow: 0.05 }} />
        <Typography color="primary" component={Link} to="/build-a-pc" style={{ textDecoration: "none" }} >PC Builder</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0.05 }} />
       
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          
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
