import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import Explore from '../components/Explore'
import FoodDisplay from '../components/FoodDisplay';
import Circle from '../components/Circle';
import { StoreContext } from '../Context/StoreContext';
import { Link } from 'react-router-dom';

function Home() {

  const [category , setCategory]=useState("All");
  const { food_list, url } = useContext(StoreContext);

  // Get featured/popular items (first 6 items)
  const featuredItems = food_list.slice(0, 6);

  return (
    <>
    <Header/>
    
    {/* Featured Section */}
    <section className='mt-12 mb-16'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h2 className='text-3xl font-bold text-[#262626] mb-2'>Featured Dishes</h2>
          <p className='text-[#808080]'>Our most popular and highly rated dishes</p>
        </div>
        <Link to='/menu' className='text-[#2d5016] font-semibold hover:text-[#3d7026] transition-colors'>
          View All Menu →
        </Link>
      </div>
      <div className='grid grid-cols-list gap-6'>
        {featuredItems.map((item, index) => (
          <div key={index} className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
            <div className='relative h-48 overflow-hidden'>
              <img 
                src={url + "/images/" + item.image} 
                className='w-full h-full object-cover hover:scale-110 transition-transform duration-300' 
                alt={item.name} 
              />
              <div className='absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-lg'>
                <span className='text-[#2d5016] font-semibold'>₹{item.price}</span>
              </div>
            </div>
            <div className='p-4'>
              <h3 className='text-lg font-semibold text-[#262626] mb-1'>{item.name}</h3>
              <p className='text-sm text-[#808080] line-clamp-2'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Explore Menu Section */}
    <Explore category={category} setCategory={setCategory}/>
    
    {/* Top Dishes Section */}
    <FoodDisplay category={category} />
    {/* Why Choose Us Section */}
    <section className='mt-20 mb-16 bg-gradient-to-r from-[#f8f9fa] to-[#ffffff] rounded-2xl p-12'>
      <h2 className='text-3xl font-bold text-center text-[#262626] mb-12'>Why Choose Rasoi?</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-[#2d5016] rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-[#262626] mb-2'>Fast Delivery</h3>
          <p className='text-[#808080]'>Get your favorite food delivered to your doorstep in no time</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-[#2d5016] rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-[#262626] mb-2'>Fresh Ingredients</h3>
          <p className='text-[#808080]'>We use only the freshest ingredients for all our dishes</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-[#2d5016] rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-[#262626] mb-2'>Premium Quality</h3>
          <p className='text-[#808080]'>Experience premium quality food crafted with care</p>
        </div>
      </div>
    </section>

    <Circle/>
    </>
  )
}

export default Home