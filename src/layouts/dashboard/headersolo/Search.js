import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener,TextField } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// component
import Iconify from '../../../components/iconify';
const Search = () => {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;
  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/shop");
    }
  };

  const StyledSearchbar = styled('div')(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    top: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: HEADER_MOBILE,
    padding: theme.spacing(0, 3),
    boxShadow: theme.customShadows.z8,
    [theme.breakpoints.up('md')]: {
      height: HEADER_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    


    <ClickAwayListener onClickAway={handleClose}>
    <div>
      {!open && (
        <IconButton onClick={handleOpen}>
          <Iconify icon="eva:search-fill" />
        </IconButton>
      )}

      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <form onSubmit={searchHandler}>
        <StyledSearchbar>
          <Input
            autoFocus
            fullWidth
            disableUnderline
            placeholder="Search…"
            onChange={(e) => setKeyword(e.target.value)}
            value ={keyword}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
            sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
          />
          <Button variant="contained" type="submit">
            Search
          </Button>
        </StyledSearchbar>
        </form>
      </Slide>
    </div>
  </ClickAwayListener>
 
  );
};

export default Search;
