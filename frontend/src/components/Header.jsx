import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
    <div className='header h-[34vw] bg-headerI bg-no-repeat bg-cover bg-center relative overflow-hidden 
      transform hover:scale-[1.01] transition-all duration-500'>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b47]/20 to-[#f4d03f]/10"></div>

      <div className="animate-fade absolute flex flex-col items-start gap-[1vw] max-w-[50%] bottom-[10%] left-[6vw] z-10">
        <div className="transform hover:translate-x-2 transition-all duration-300">
          <h2 className='font-[700] text-ss text-white leading-tight drop-shadow-lg mb-4'>
            Order your favourite food here
          </h2>
          <p className='text-[1vw] text-white/95 leading-relaxed drop-shadow-md backdrop-blur-sm'>
            Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. To satisfy your craving and elevate your dining experience, one delicious meal at a time.
          </p>
        </div>
        
        <Link to='/menu' className="group">
          <button className='bg-[#ff6b47] text-white font-bold py-[1vw] px-[2.3vw] 
            text-ss1 hover:bg-[#ff8a6b] hover:scale-105 transform transition-all duration-300'>
            <span className="flex items-center gap-2">
              View Menu
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Header
