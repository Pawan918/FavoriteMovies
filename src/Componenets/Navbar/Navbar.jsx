import React, { useReducer, useState } from 'react'
import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import { titleCase2 } from '../../utilities/titleCase';
import { Link } from 'react-router-dom';
// import Logo from "./../Logo/Logo";
import Logo from './../Logo/Logo'
import { fetchData2 } from '../../utilities/fetchData';


function Navbar(props) {

  const [isHidden, setIsHidden] = useState(false);
  let url = `https://api.enime.moe/search/`;

  const searchHandler = () => {
    setIsHidden(!isHidden);
  }
  const inputHandler = (e)=>{
    if(e.keyCode === 13 ){
      const val = titleCase2(e.target.value)
      e.target.value = '';
      url = `${url}${val}?perPage='100'`;
      props.setPageNumber(1);
      props.url(url);
    }
  }
  const defaultState = {
    url : ""
  }
  const reducer = (state, action)=>{
    if(action.type === "NEWEST"){
      props.setPageNumber(1);
      props.url('https://api.enime.moe/recent');
      return {url:'https://api.enime.moe/recent'};
    }
    if(action.type === "POPULAR"){
      
      // console.log('popular')
      props.setPageNumber(1);
      props.url('https://api.enime.moe/popular');
      return {url : 'https://api.enime.moe/popular'}
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
  const [state , dispatch]  = useReducer(reducer,defaultState)
  return (
    <>
    <div className="header">
      <div className='logo'>
        <Logo/>
      </div>
    <div className='navbar'>
      <ul className='navbar-item'>
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
      </ul>
      <div className="navbar-search">

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
      </div>
    </div>
    </div>
    <hr></hr>
    </>
  )
}

export default Navbar
