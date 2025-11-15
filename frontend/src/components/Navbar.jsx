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
      <nav id='nav' className="animate-fade py-5 px-0 sticky top-0 z-50 bg-gradient-to-r from-white/90 via-orange-50/90 to-yellow-50/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to='/' className="group">
            <h1 className='text-5xl font-bold bg-gradient-to-r from-[#ff6b47] via-[#ff9f1c] to-[#f4d03f] bg-clip-text text-transparent 
              group-hover:from-[#ff8a6b] group-hover:via-[#ffb84d] group-hover:to-[#f7dc6f] transition-all duration-500 transform group-hover:scale-105 
              drop-shadow-lg'>
              Rasoi
            </h1>
          </Link>
          
          <ul className='hidden md:flex items-center gap-8 text-[#49557e] text-xl'>
            <li>
              <Link to='/' onClick={()=>setMenu("home")} 
                className={`relative group transition-all duration-300 hover:text-[#ff6b47] ${
                  menu === 'home' ? 'text-[#ff6b47] font-bold' : ''
                }`}>
                <span className="flex items-center">
                  home
                </span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff6b47] to-[#ff9f1c] rounded-full transition-all duration-300 group-hover:w-full ${
                  menu === 'home' ? 'w-full' : ''
                }`}></span>
              </Link>
            </li>
            <li>
              <Link to='/menu' onClick={()=>setMenu("menu")} 
                className={`relative group transition-all duration-300 hover:text-[#ff9f1c] ${
                  menu === 'menu' ? 'text-[#ff9f1c] font-bold' : ''
                }`}>
                <span className="flex items-center">
                  menu
                </span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff9f1c] to-[#f4d03f] rounded-full transition-all duration-300 group-hover:w-full ${
                  menu === 'menu' ? 'w-full' : ''
                }`}></span>
              </Link>
            </li>
            <li>
              <Link to='/reservation' onClick={()=>setMenu("reservation")} 
                className={`relative group transition-all duration-300 hover:text-[#27ae60] ${
                  menu === 'reservation' ? 'text-[#27ae60] font-bold' : ''
                }`}>
                <span className="flex items-center">
                  reservation
                </span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#27ae60] to-[#2ecc71] rounded-full transition-all duration-300 group-hover:w-full ${
                  menu === 'reservation' ? 'w-full' : ''
                }`}></span>
              </Link>
            </li>
            <li>
              <Scroll to="footer" spy={true} smooth={true} duration={500} offset={50} 
                onClick={()=>setMenu("contact-us")} 
                className={`relative group transition-all duration-300 hover:text-[#a29bfe] cursor-pointer ${
                  menu === 'contact-us' ? 'text-[#a29bfe] font-bold' : ''
                }`}>
                <span className="flex items-center">
                  contact-us
                </span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a29bfe] to-[#6c5ce7] rounded-full transition-all duration-300 group-hover:w-full ${
                  menu === 'contact-us' ? 'w-full' : ''
                }`}></span>
              </Scroll>
            </li>
          </ul>

          <div className="flex items-center gap-6">
            <button className="group relative text-[#ff9f1c] hover:text-[#ff6b47] transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <Link to='/cart' className="group relative text-[#27ae60] hover:text-[#2ecc71] transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
              </svg>
              {getCartTotal() > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#ff6b47] to-[#ff9f1c] rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                  {getCartTotal()}
                </div>
              )}
            </Link>

            {!token ? (
              <button onClick={()=>setShow(true)} 
                className='text-[#ff6b47] text-lg font-semibold py-2 px-6 cursor-pointer 
                hover:text-[#ff8a6b] transform transition-all duration-300 hover:scale-105 
                border-b-2 border-transparent hover:border-[#ff6b47] tracking-wide'>
                <span className="flex items-center gap-2">
                  Sign in
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            ) : (
              <div className="relative group">
                <button className="text-[#a29bfe] hover:text-[#6c5ce7] transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-100 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    <button onClick={()=>navigate('/my-order')} 
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 text-gray-700 hover:text-[#ff6b47]">
                      <svg className="w-4 h-4 text-[#ff9f1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="text-sm">Orders</span>
                    </button>
                    <button onClick={()=>navigate('/my-reservations')} 
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 text-gray-700 hover:text-[#27ae60]">
                      <svg className="w-4 h-4 text-[#27ae60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 14h10l-2-14m-4 0V7a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6" />
                      </svg>
                      <span className="text-sm">Reservations</span>
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={logout} 
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 text-gray-700 hover:text-[#ff6b47]">
                      <svg className="w-4 h-4 text-[#ff6b47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
