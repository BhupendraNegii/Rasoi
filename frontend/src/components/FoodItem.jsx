import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../Context/StoreContext';

function FoodItem({item}) {

    const {cardItem,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <>
    <div className="w-full m-auto rounded-xl animate-fade2 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white group">

    <div className="relative overflow-hidden">
        <img 
          src={url + "/images/"+item.image} 
          className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300' 
          alt={item.name} 
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#2d5016]">
            ₹{item.price}
          </span>
        </div>
        {
             !cardItem[item._id || item.id] && !cardItem[String(item._id || item.id)]
             ? <div className="absolute bottom-3 right-3">
                <button 
                  onClick={()=> addToCart(item._id || item.id)} 
                  className="w-10 h-10 bg-[#2d5016] hover:bg-[#3d7026] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <img src={assets.add_icon_white} className='w-5 h-5' alt="Add to cart"/>
                </button>
              </div> : 
             <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-full bg-white shadow-lg">
                <button onClick={()=>removeFromCart(item._id || item.id)} className="cursor-pointer hover:scale-110 transition-transform">
                  <img src={assets.remove_icon_red} className='w-6 h-6' alt="Remove"/>
                </button>
                <span className="text-[#2d5016] font-semibold min-w-[20px] text-center">{cardItem[item._id || item.id] || cardItem[String(item._id || item.id)]}</span>
                <button onClick={()=>addToCart(item._id || item.id)} className="cursor-pointer hover:scale-110 transition-transform">
                  <img src={assets.add_icon_green} className='w-6 h-6' alt="Add"/>
                </button>
             </div>
        }
    </div>      
    <div className="p-5">
        <div className="flex justify-between items-start mb-3">
            <h3 className='text-lg font-semibold text-[#262626] capitalize line-clamp-1'>{item.name}</h3>
            <img src={assets.rating_starts} className='w-[70px] flex-shrink-0 ml-2' alt="Rating" />
        </div>
        <p className='text-[#676767] text-sm mb-3 line-clamp-2 leading-relaxed'>{item.description}</p>
        <div className="flex items-center justify-between">
          <p className='text-[#2d5016] text-xl font-bold'>₹{item.price}</p>
          {(cardItem[item._id || item.id] || cardItem[String(item._id || item.id)]) && (
            <span className="text-xs text-green-600 font-medium">In cart</span>
          )}
        </div>
    </div>
    </div>
    </>
  )
}

export default FoodItem
