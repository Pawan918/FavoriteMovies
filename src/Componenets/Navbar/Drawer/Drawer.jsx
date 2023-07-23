import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { SvgIcon } from "@mui/material";
import Logo from "../../Logo/Logo";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
const navItems = [
  "GENRES",
  "TYPES",
  "UPDATED",
  "ADDED",
  "ONGOING",
  "UPCOMING",
  "RANDOM"
];

function DrawerAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
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


  return (
    <>
      {/* <Box sx={{ display: "flex", position: "relative",width:'100%',margin:'0'}}> */}
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
                // !isHidden && (
                <>
                  <li className="navbar-items"><a href="#">UPCOMING</a></li>
                  <li className="navbar-items"><a href="#" onClick={() => dispatch({ type: "RANDOM" })}>RANDOM</a></li>
                </>

                // )
              }
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

            </ul>
          </Box>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
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
    </>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default DrawerAppBar;
