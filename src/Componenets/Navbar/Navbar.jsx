import React, { useReducer, useState, useRef } from 'react'
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
import { Link } from 'react-router-dom';

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
    setTimeout(() => {
      if (inputRef.current != null) {
        inputRef.current.getElementsByTagName('input')[0].focus();
      }
    }, 10)
  }

  // to hide the search bar when search input is out of focus
  const handleBlur = () => {
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
                  <Link to='/' className='navbar-items'>GENRE</Link>
                  <li className="navbar-items"><a href="#">UPDATED</a></li>
                  <Link to='/popular' className='navbar-items'>
                    POPULAR
                  </Link>
                  <Link to='/newest' className='navbar-items'>
                    NEWEST
                  </Link>
                  {
                    !isHidden ? (
                      <>
                        <Link to='/upcoming' className='navbar-items'>
                          UPCOMING
                        </Link>
                        <Link to='/' className='navbar-items'>RANDOM</Link>
                      </>
                    ) : (
                      <Search >
                        <SearchIconWrapper >
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          placeholder="Search…"
                          inputProps={{ 'aria-label': 'search' }}
                          ref={inputRef}
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
              <MenuItem onClick={handleClose}>
                <Link to='/' className='navbar-items'>GENRE</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to='/' className='navbar-items'>UPDATED</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to='/popular' className='navbar-items'>POPULAR</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to='/newest' className='navbar-items'>NEWEST</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to='/upcoming' className='navbar-items'>UPCOMING</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to='/' className='navbar-items'>RANDOM</Link>
              </MenuItem>
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
