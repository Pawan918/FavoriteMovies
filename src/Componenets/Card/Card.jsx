import React, { useState } from 'react'
import './card.scss'
import CardSide from './CardSide/CardSide';
import CardMain from './CardMain/CardMain';
import { Link } from 'react-router-dom';
function Card(props) {
  // to respond to hovering over the card
  const [isHovering, setIsHovering] = useState(false);
  // to know if the card is not outside the width of screen
  const [isOutside, setIsOutsied] = useState(false)

  // to know mouse hovering
  const handleMouseOver = (e) => {
    setIsHovering(true);
  }

  // to handle move hovering
  const handleMouseOut = () => {
    setIsHovering(false)
  }
  // console.log(props?.trailer);
  const myref = (e) => {
    if (e !== null) {
      if (isHovering) {
        const x = e.getBoundingClientRect().right;
        const width = x + 400;
        if (width > window.innerWidth) {
          setIsOutsied(true);
        } else {
          setIsOutsied(false);
        }
      }
    }
  }
  let res;
  if (props.res.anime !== undefined) {
    res = props.res.anime;
  } else {
    res = props.res;
  }
  return (
    <Link to={`/anime/${res.slug}/${res.currentEpisode || 'trailer'}`} state={{ trailer: res.trailer }} className='cards-link'>
      <div className='card' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ref={myref} >
        <CardMain res={res} />
        {isHovering && (
          <CardSide res={res} isOutside={isOutside} />
        )
        }
      </div>
    </Link>
  )
}

export default Card