import React from 'react'
import { ReactSVG } from 'react-svg';
import './logo.scss'
function Logo() {
  return (
    <div className='logo'>
      <ReactSVG src='/ani.svg' className='logo-svg'/>
    </div>
  )
}

export default Logo
