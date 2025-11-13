import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link,  useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import {Link as Scroll} from "react-scroll";
function Navbar({setShow}) {

    const [menu , setMenu]=useState("home");
    const navigate = useNavigate();
    const location = useLocation();

    // Update active menu based on current route
    useEffect(() => {
        if (location.pathname === '/') {
            setMenu("home");
        } else if (location.pathname === '/menu') {
            setMenu("menu");
        } else if (location.pathname === '/reservation') {
            setMenu("reservation");
        } else if (location.pathname === '/cart') {
            setMenu("home");
        }
    }, [location]);

    const {getCartTotal , token , setToken }=useContext(StoreContext);

    const logout = ()=>{

      localStorage.removeItem("token");
      setToken("");
      navigate("/");

    }


  return (
    <>
      <div id='nav' className=" animate-fade py-5 px-0 flex items-center justify-between">
       <Link to='/'>
        <h1 className='text-4xl font-bold text-[#2d5016]'>Rasoi</h1>
       </Link>
        <ul className='flex gap-5 text-[#49557e] text-[18px]  '>

            <Link to='/' onClick={()=>setMenu("home")} className={menu === `home`  ? `pb-[2px] cursor-pointer   border-b-2 border-orange-500`  : "cursor-pointer"}>home</Link>
            <Link to='/menu' onClick={()=>setMenu("menu")} className={menu === `menu`  ? `pb-[2px] cursor-pointer border-b-2 border-orange-500` : " cursor-pointer"}>menu</Link>
            <Link to='/reservation' onClick={()=>setMenu("reservation")} className={menu === `reservation`  ? `pb-[2px] cursor-pointer border-b-2 border-orange-500`  : "cursor-pointer"}>reservation</Link>
            <Scroll to="footer" spy={true} smooth={true} duration={500}  offset={50} onClick={()=>setMenu("contact-us")} className={menu === `contact-us` ? `pb-[2px] cursor-pointer border-b-2 border-orange-500` : "cursor-pointer"}>contact-us</Scroll>

        </ul>
        <div className="flex items-center gap-10 phone:(gap-[30px]) ">
            <img src={assets.search_icon} className='cursor-pointer phone:(w-[22px]) w-5 h-5' alt="" />
            <div className="relative ">
              <Link to='/cart'>
                <img src={assets.basket_icon} className='cursor-pointer w-5 h-5' alt="" /></Link>

                <div className={getCartTotal()===0 ? "" : `dot absolute min-w-[10px] min-h-[10px] bg-red-500 top-0 -right-2 rounded-md`}> 
                </div>

            </div>
            {!token ? 
            <button onClick={()=>setShow(true)} className='bg-[#d4af37] text-white text-lg font-medium py-[10px] px-[30px] rounded-[50px] cursor-pointer hover:bg-[#c4a027] transition-all duration-300 phone:()'>Sign-in</button>
            : <div className=" relative peer/p   ">
              <img src={assets.profile_icon} className='peer/p cursor-pointer' alt="" />
              <ul className='  absolute hidden right-0 z-100 hover:flex cursor-pointer  peer-hover/p:flex gap-2  flex-col   bg-white p-2 '>
                <li  onClick={()=>navigate('/my-order')} className='flex gap-2'><img className='w-5 ' src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <li  onClick={()=>navigate('/my-reservations')} className='flex gap-2'><img className='w-5 ' src={assets.selector_icon} alt="" /><p>Reservations</p></li>
                <hr />
                <li onClick={logout} className='flex gap-2'><img className='w-5 ' src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>

            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Navbar
