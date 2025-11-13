import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <div className='min-w-[15vmax]  min-h-[100vh] border-[1.5px] border-t-0 border-[#a9a9a9]  '>

        <div className=" flex flex-col pt-[50px]  pl-[18%] gap-5 ">
           <NavLink to='/add' className="option    focus:bg-orange-200 focus:border-orange-600  flex items-center gap-3 border-[1.5px] cursor-pointer border-[#a9a9a9] border-r-0 py-2 px-[10px] rounded-tl-[10px] rounded-bl-[10px] ro ">
              <img src={assets.add_icon} className='w-[2vmax]' alt="" />
              <p >Add Items</p>
            </NavLink> 
            <NavLink to='/list' className="option  focus:bg-orange-200 focus:border-orange-600  flex items-center gap-3 border-[1.5px] cursor-pointer border-[#a9a9a9] border-r-0 py-2 px-[10px] rounded-tl-[10px] rounded-bl-[10px] ro">
              <img src={assets.order_icon} className='w-[2vmax]' alt="" />
              <p>List Items</p>
            </NavLink> 
            <NavLink to='/order' className="option shrink focus:bg-orange-200 focus:border-orange-600  flex items-center gap-3 border-[1.5px] cursor-pointer border-[#a9a9a9] border-r-0 py-2 px-[10px] rounded-tl-[10px] rounded-bl-[10px] ro">
              <img src={assets.order_icon} className='w-[2vmax]' alt="" />
              <p>Orders</p>
            </NavLink> 
            <NavLink to='/reservations' className="option shrink focus:bg-orange-200 focus:border-orange-600  flex items-center gap-3 border-[1.5px] cursor-pointer border-[#a9a9a9] border-r-0 py-2 px-[10px] rounded-tl-[10px] rounded-bl-[10px] ro">
              <img src={assets.order_icon} className='w-[2vmax]' alt="" />
              <p>Reservations</p>
            </NavLink> 
        </div>
      
    </div>
  )
}

export default SideBar
