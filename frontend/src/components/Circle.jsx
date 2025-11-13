import React from 'react'
import arrow from '../assets/arrow.svg'
import { Link as Scroll } from 'react-scroll'


function Circle() {
  return (
    <Scroll to="nav" spy={true} smooth={true} duration={600}  offset={-100} className=' fixed w-15 h-15   rounded-full bottom-1 right-4 border-4  '>
     <span className='flex w-full h-full  items-center justify-center'>
        <img src={arrow} alt="" />
        
        </span> 
    </Scroll>
  )
}

export default Circle
