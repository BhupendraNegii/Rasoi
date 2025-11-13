import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
    <div  className='header h-[34vw] bg-headerI bg-no-repeat bg-cover bg-center relative rounded-[24px] overflow-hidden'>

        {/* Dark overlay on the left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-[24px]"></div>

        <div className=" animate-fade absolute flex flex-col items-start gap-[1vw] max-w-[50%] bottom-[10%] left-[6vw] z-10">

            <h2 className=' font-[700] text-ss text-white leading-tight'>Order your favourite food here</h2>
            <p className='text-[1vw] text-white/90 leading-relaxed'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. To satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>
            <Link to='/menu'>
              <button className='bg-[#2d5016] text-white  font-[600] py-[1vw] px-[2.3vw] rounded-[40px] text-ss1 hover:bg-[#3d7026] transition mt-2 cursor-pointer'>View Menu</button>
            </Link>
        </div>
    
    </div>
    </>
      
  )
}

export default Header
