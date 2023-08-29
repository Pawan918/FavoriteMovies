import React, { useReducer, useState, useRef, useEffect } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useCookies } from "react-cookie";
import axios from 'axios';

const navItems = [
  "GENRES",
  "TYPES",
  "UPDATED",
  "ADDED",
  "ONGOING",
  "UPCOMING",
  "RANDOM"
];
const genreOptions = [
  {value : '1' , label :'Action', key:'1'},
  {value : '2' , label :'Adventure' , key:'2'},
  {value : '5' , label :'Avant Garde', key:'3'},
  {value : '46' , label :'Award Winning' , key:'4'},
  {value : '28' , label :'Boys Love' , key:'5'},
  {value : '4' , label :'Comedy' , key:'6'},
  {value : '8' , label :'Drama' , key:'7'},
  {value : '10' , label :'Fantasy' , key:'8'},
  {value : '26' , label :'Girls Love' , key:'9'},
  {value : '47' , label :'Gourmet' , key:'10'},
  {value : '14' , label :'Action' , key:'11'},
  {value : '7' , label :'Mystery', key:'12'},
  {value : '22' , label :'Romance', key:'13'},
  {value : '24' , label :'Sci-Fi', key:'14'},
  {value : '36' , label :'Slice of Life', key:'15'},
  {value : '30' , label :'Sports', key:'16'},
  {value : '31' , label :"Supernatural", key:'17'},
  {value : '41' , label :'Suspense', key:'18'},
]
const typeOptions = [
  {value : 'tv', label : 'TV',key:1},
  {value : 'movie',label : 'MOVIE',key:2},
  {value :  'ova' , label :'OVAs',key:3},
  {value : 'special', label : 'SPECIAL',key:4},
  {value : 'ona' , label :'ONAs',key:5},
  // {value : 'music' , label :'Music',key:6}
]

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cookies,removeCookie] = useState([]);
  const [signed,setSigned]  = useState(false)
  const [username,setUsername] = useState('')
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
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
  const [genreHidden, setGenreHidden] = useState(false);
  const [typeHidden, setTypeHidden] = useState(false)

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
      navigate(`/${val}`)
      e.target.value = '';
      setIsHidden(true);
    }
  }

  const genreHandle = (value)=>{
    navigate(`/filter?genre=${value}`)
  }
  const typeHandle = (value)=>{
    navigate(`/filter?type=${value}`)
  }

  useEffect(()=>{
    const verifyCookie = async()=>{
      if(!cookies.token){
        setSigned(false)
        console.log('hello')}
        const { data } = await axios(
          {
            method: 'post',
            url: "http://localhost:4000",
            withCredentials: true,
            mode: 'no-cors',
          }
        );
        const { status, user } = data;
        console.log(status,user)
        setUsername(user);
        setSigned(status);
        console.log(status)
        // return status
        //   ? toast(`Hello ${user}`, {
        //       position: "top-right",
        //     })
        //   : (removeCookie("token"), navigate("/login"));
    }
    verifyCookie();
  },[cookies,navigate,removeCookie])
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <div className="header">
        {/* <div className='logo'>
        <Logo/>
      </div> */}
        <div className='navbar'>
          {/* <Drawer/> */}
          <AppBar component="nav" sx={{ backgroundColor: '#161616', position: 'static', boxShadow: 'none', height: '100px', padding: '0px' }}>
            <Toolbar >
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
                <ul className='navbar-item'>
                  <li className='navbar-items' onMouseOver={()=>{setGenreHidden(true)}} onMouseLeave={()=>{setGenreHidden(false)}}>
                    <a href=""  >GENRES</a>
                    {
                      genreHidden && (
                        <ul className='type-sub genre' >
                          {
                            genreOptions.map((data)=>{
                              return (<li className='type-sub--items' onClick={()=>{genreHandle(data.value)}} key={data.key}>{data.label}</li>)
                            })
                          }
                        </ul>
                      )
                    }
                  </li>
                  <li className='navbar-items' onMouseEnter={()=>setTypeHidden(true)} onMouseLeave={()=>{setTypeHidden(false)}}>
                    <a href="">TYPES</a>
                    {
                      typeHidden && (
                        <ul className='type-sub' > {
                          typeOptions.map((data)=>{
                            return (<li className='type-sub--items' onClick={()=>{typeHandle(data.value)}} key={data.key}>{data.label}</li>)
                          })
                        }
                        </ul>
                      )
                    }
                  </li>
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
              <div className='login'>
                <AccountCircleRoundedIcon className='login-icon' />
                <div className='login-name'>{signed ? username : "SignIn"}</div>
              </div>
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
                <Link to='/' className='navbar-items' >GENRE</Link>
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
        </div>
      </div>
      <hr></hr>
    </>
  )
}
export default Navbar
