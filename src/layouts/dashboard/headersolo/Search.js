import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from "axios";
// @mui
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener,TextField,Autocomplete } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// component
import Iconify from '../../../components/iconify';
import '../../../App.css'

const Search = () => {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;
  const searchHandler = (e) => {
    e.preventDefault();

    if (text.trim()) {
      navigate(`/search/${text}`);
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


  const [users, setUsers] = useState([])
  const [text,setText] = useState('')
  const [suggestions,setSuggestions] = useState([])
  useEffect(()=>{


    const loadUsers = async()=>{
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/products`)
       console.log(response.data.products)
      setUsers(response.data.products)
    }

    loadUsers();
  },[])

const  onChangeHandler = (text) =>
  {
    let matches =[]
    if(text.length>0)
    {
      matches =users.filter(user=>{

        const regex = new RegExp(`${text}`,"gi")
        return user.name.match(regex)
      })
    }
    console.log('matches',matches)
    setSuggestions(matches)
    setText(text)
  }

 const onSuggestHandler = (text) =>
 {
  setText(text)
  setSuggestions([])
 }

 
  


 

  return (
    

    <ClickAwayListener onClickAway={handleClose}>
    <div>
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
/>

      {!open && (
        <IconButton onClick={handleOpen}>
          <Iconify icon="eva:search-fill" />
        </IconButton>
      )}

      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <form onSubmit={searchHandler}>
        {/* <StyledSearchbar> */}
          <Input
          className="form-group col-md-6"

            placeholder="Search…"
            onChange={(e) => onChangeHandler(e.target.value)}
            value ={text}
            sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
          
          />
          







          <Button variant="contained" type="submit">
            Search
          </Button>

          {suggestions && suggestions.map((suggestion,i)=>
          <div key={i} className="suggestion text-dark col-md-6 justify-content-md-center" onClick={()=>onSuggestHandler(suggestion.name)}>{suggestion.name}</div>
          
          )}
        {/* </StyledSearchbar> */}
        </form>
      </Slide>
    </div>
  </ClickAwayListener>
 
  );
};

export default Search;
