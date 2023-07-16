import React, { useReducer, useState,useRef } from 'react'
import './navbar.scss'
// import SearchIcon from '@mui/icons-material/Search';
import { titleCase2 } from '../../utilities/titleCase';
// import Logo from "./../Logo/Logo";
import Logo from './../Logo/Logo'
import { fetchData2 } from '../../utilities/fetchData';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";

const navItems = [
  "GENRES",
  "TYPES",
  "UPDATED",
  "ADDED",
  "ONGOING",
  "UPCOMING",
  "RANDOM"
];

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const inputRef = useRef(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));




  const [isHidden, setIsHidden] = useState(false);
  let url = `https://api.enime.moe/search/`;

  // to handle when search icon is clicked
  const searchHandler = () => {

    setIsHidden(!isHidden);
    // to give automatic focus on clicking the search bar
    setTimeout(()=>{
      if(inputRef.current != null){
        inputRef.current.getElementsByTagName('input')[0].focus();
      }
    },10)
  }

  // to hide the search bar when search input is out of focus
  const handleBlur = ()=>{
    setIsHidden(false);
  }

  // to handle the input in search bar
  const inputHandler = (e) => {
    if (e.keyCode === 13) {
      const val = titleCase2(e.target.value)
      e.target.value = '';
      url = `${url}${val}?perPage='100'`;
      props.setPageNumber(1);
      props.url(url);
      setIsHidden(false)
    }
  }
  const defaultState = {
    url: ""
  }
  const reducer = (state, action) => {
    if (action.type === "NEWEST") {
      props.setPageNumber(1);
      props.url('https://api.enime.moe/recent');
      return { url: 'https://api.enime.moe/recent' };
    }
    if (action.type === "POPULAR") {

      // console.log('popular')
      props.setPageNumber(1);
      props.url('https://api.enime.moe/popular');
      return { url: 'https://api.enime.moe/popular' }
    }
    // if(action.type === 'RANDOM'){
    //   const fetchDatas = async()=>{
    //     const res = await fetchData2('https://api.jikan.moe/v4/random/anime');
    //     if()
    //     const res2 = await fetchData2(`https://api.enime.moe/mapping/mal/${res.data.mal_id}`);
    //     if(res2.statusCode === 404 && res2.format  != 'SPECIAL') fetchDatas();
    //     props.url(`https://api.enime.moe/mapping/mal/${res.data.mal_id}`)
    //   }
    //   fetchDatas();
    //   // props.url('');
    //   // return {url:'https://api.jikan.moe/v4/random/anime'}

    // }

  }
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <>
      <div className="header">
        {/* <div className='logo'>
        <Logo/>
      </div> */}
        <div className='navbar'>
          {/* <Drawer/> */}
          <AppBar component="nav" sx={{ backgroundColor: '#161616', position: 'static', boxShadow: 'none', height: '100px' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                // aria-label="open drawer"
                edge="end"
                onClick={handleClick}
                sx={{ mr: 2, display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Logo />
              <Box sx={{ display: { sm: 'none', md: 'none', xs: 'none', lg: "flex" }, marginLeft: 'auto', alignItems: 'center', }}>
                {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" , fontSize:'16px'}}>
                {item}
              </Button>
            ))} */}
                <ul className='navbar-item'>
                  <li className="navbar-items"><a href="#" onClick={() => dispatch({ type: "GENRE" })}>GENRE</a></li>
                  <li className="navbar-items"><a href="#">UPDATED</a></li>
                  <li className="navbar-items"><a href="#" onClick={() => dispatch({ type: "POPULAR" })} >POPULAR</a></li>
                  <li className="navbar-items"><a href="#" onClick={() => dispatch({ type: "NEWEST" })} >NEWEST</a></li>
                  {
                    !isHidden ? (
                      <>
                        <li className="navbar-items"><a href="#">UPCOMING</a></li>
                        <li className="navbar-items"><a href="#" onClick={() => dispatch({ type: "RANDOM" })}>RANDOM</a></li>
                      </>
                    ) : (
                      <Search >
                        <SearchIconWrapper >
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          placeholder="Search…"
                          inputProps={{ 'aria-label': 'search' }}
                          ref = {inputRef}
                          onBlur={handleBlur}
                          onKeyDown={inputHandler}
                        />
                      </Search >
                    )
                  }
                </ul>
              {
                !isHidden && (

              <IconButton size="large" aria-label="search" color="inherit" onClick={searchHandler}>
                <SearchIcon />
              </IconButton>
                )
              }
              </Box>
            </Toolbar>
          </AppBar>

          <Box component="nav" >
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>GENRES</MenuItem>
              <MenuItem onClick={handleClose}>TYPES</MenuItem>
              <MenuItem onClick={handleClose}>UPDATED</MenuItem>
              <MenuItem onClick={handleClose}>ADDED</MenuItem>
              <MenuItem onClick={handleClose}>ONGOING</MenuItem>
              <MenuItem onClick={handleClose}>UPCOMING</MenuItem>
            </Menu>
          </Box>
          {/* </Box> */}
          {/* </> */}
          {/* <ul className='navbar-item'>
        <li className="navbar-items"><a href="#" onClick={()=>dispatch({type:"GENRE"})}>GENRE</a></li>
        <li className="navbar-items"><a href="#">UPDATED</a></li>
        <li className="navbar-items"><a href="#"  onClick={()=>dispatch({type:"POPULAR"})} >POPULAR</a></li>
        <li className="navbar-items"><a href="#"  onClick={()=>dispatch({type:"NEWEST"})} >NEWEST</a></li>
        {
          !isHidden && (
            <>
            <li className="navbar-items"><a href="#">UPCOMING</a></li>
            <li className="navbar-items"><a href="#" onClick={()=>dispatch({type:"RANDOM"})}>RANDOM</a></li>
            </>
          )
        }
       </ul>  */}
          {/* <Drawer/> */}
          {/* <div className="navbar-search">

        {
          isHidden && (
            <div className="navbar-search__input">
              <input type="text" className='navbar-search__input_text' placeholder='Search'  onKeyDown={inputHandler}/>
            </div>
          )
        }
            <div className="navbar-search__icon" onClick={searchHandler}>
              <SearchIcon />
            </div>
            
      </div> */}
        </div>
      </div>
      <hr></hr>
    </>
  )
}
export default Navbar
