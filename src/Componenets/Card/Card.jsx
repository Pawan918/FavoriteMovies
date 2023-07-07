import React, { useState } from 'react'
import './card.scss'
import CardSide from './CardSide/CardSide';
import CardMain from './CardMain/CardMain';
import { Link } from 'react-router-dom';
function Card(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOutside,setIsOutsied] = useState(false)

  const handleMouseOver = (e)=>{
    setIsHovering(true);
  }
  const handleMouseOut = ()=>{
    setIsHovering(false)
  }

  const myref = (e)=>{
    if(e !== null){
      if(isHovering){
        const x = e.getBoundingClientRect().right;
        const width = x + 400;
        if(width > window.innerWidth){
          setIsOutsied(true);
        }else{
          setIsOutsied(false);
        }
      }
    }
  }

  // const cardHandler = ()=>{
  //   console.log(props)
  //   props.url(`https://api.enime.moe/anime/${props.res?.anime?.id}`)
  // }
  // console.log(props)
  let res ;
  if(props.res.anime !== undefined){
    res = props.res.anime;
  }else{
    res = props.res;
  }
  // console.log(res)
  return (
    <Link to={`/anime/${res.slug}`} state = {res} className='cards-link'>
    <div className='card' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ref={myref} >
      <CardMain res={res}/>
      {isHovering &&(
        <CardSide res={res} isOutside = {isOutside}/>
        )
      }
    </div>
      </Link>
  )
}

export default Card