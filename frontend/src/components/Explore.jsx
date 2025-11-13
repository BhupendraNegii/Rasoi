import React from 'react'
import { menu_list } from '../assets/assets'

function Explore({category , setCategory}) {
  return (
    <div className='flex flex-col mt-8  gap-5 ' id='explore'>

        <h1 className='font-bold text-3xl text-[#262626]'>Explore Our Menu</h1>
        <p className='max-w-[60%] text-[#808080] text-base leading-relaxed'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>

        <div className="flex justify-between items-center gap-[30px] text-center my-5 mx-0 overflow-x-scroll no-scrollbar ">
            {menu_list.map((item,index)=>(
                <div onClick={()=>setCategory(prve=>prve===item.menu_name ? "All" : item.menu_name )} key={index} className='listii'>
                   <img src={item.menu_image} className={`w-[7.5vw] min-[80px] cursor-pointer rounded-full object-cover object-center transition-all ease-linear duration-100 ${category===item.menu_name ? `border-4 border-orange-500`: ``}`} alt="" />
                   <p className='mt-[10px] text-[#747474] text-ss2 cursor-pointer'>{item.menu_name}</p>
                </div>
            ))}
        </div>

        <hr className='my-[10px] mx-0 h-[2px] bg-[#e2e2e2]'/>


      
    </div>
  )
}

export default Explore

