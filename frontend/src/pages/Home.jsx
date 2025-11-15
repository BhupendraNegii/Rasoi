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
    
    {/* Subtle background color sections */}
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-orange-50/20 via-yellow-50/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-2/3 h-96 bg-gradient-to-l from-green-50/15 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-1/2 h-96 bg-gradient-to-t from-purple-50/15 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* Featured Section */}
      <section className='mt-12 mb-16 relative'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h2 className='text-4xl font-bold mb-2 bg-gradient-to-r from-[#ff6b47] via-[#ff9f1c] to-[#f4d03f] bg-clip-text text-transparent drop-shadow-lg'>
            Featured Dishes
          </h2>
          <p className='text-gray-600 text-lg'>Our most popular and highly rated dishes</p>
        </div>
        <Link to='/menu' className='group bg-gradient-to-r from-[#ff6b47] to-[#ff9f1c] text-white font-bold px-6 py-3 rounded-full 
          hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center gap-3 shadow-lg'>
          <span>View All Menu</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
      <div className='grid grid-cols-list gap-8'>
        {featuredItems.map((item, index) => (
          <div key={index} className='group bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl 
            transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.03] border-2 border-gradient-to-r from-[#ff6b47]/20 via-[#ff9f1c]/20 to-[#f4d03f]/20'>
            <div className='relative h-56 overflow-hidden'>
              <img 
                src={url + "/images/" + item.image} 
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                alt={item.name} 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#ff6b47]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <div className='absolute top-4 right-4 bg-gradient-to-br from-[#ff6b47] to-[#ff9f1c] text-white backdrop-blur-sm px-4 py-2 rounded-full shadow-2xl border-2 border-white/50'>
                <span className='font-bold text-lg drop-shadow-md'>₹{item.price}</span>
              </div>
              <div className='absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                <div className='bg-gradient-to-r from-[#27ae60] to-[#2ecc71] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg'>
                  ⭐ Popular
                </div>
              </div>
              <div className='absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2'>
                <button className='w-full bg-gradient-to-r from-[#ff6b47] to-[#ff9f1c] text-white px-4 py-3 rounded-full shadow-2xl border-2 border-white/50 
                  hover:from-[#ff8a6b] hover:to-[#ffb84d] transition-all duration-300 flex items-center justify-center gap-2 font-bold text-sm hover:scale-105 transform'>
                  <span className="animate-bounce">🛒</span>
                  Add to Cart
                </button>
              </div>
            </div>
            <div className='p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-50'>
              <h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-[#ff6b47] transition-all duration-300 flex items-center gap-2'>
                <span className="text-2xl animate-pulse">
                  {index % 3 === 0 ? '🍕' : index % 3 === 1 ? '🍜' : '🍔'}
                </span>
                {item.name}
              </h3>
              <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4'>{item.description}</p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex text-yellow-400'>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className='text-xs font-bold text-gray-600'>(4.8)</span>
                </div>
                <div className='flex gap-1'>
                  <span className="w-2 h-2 bg-[#ff6b47] rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-[#ff9f1c] rounded-full animate-pulse delay-100"></span>
                  <span className="w-2 h-2 bg-[#f4d03f] rounded-full animate-pulse delay-200"></span>
                </div>
              </div>
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
    <section className='mt-20 mb-16 bg-gradient-to-br from-[#fffdf8] via-orange-50 to-yellow-50 rounded-3xl p-12 relative overflow-hidden'>
      
      <h2 className='text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#ff6b47] via-[#ff9f1c] to-[#f4d03f] bg-clip-text text-transparent drop-shadow-lg'>
        Why Choose Rasoi?
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10'>
        <div className='group text-center transform hover:scale-105 transition-all duration-300'>
          <div className='w-24 h-24 bg-gradient-to-br from-[#ff6b47] via-[#ff9f1c] to-[#f4d03f] rounded-3xl flex items-center justify-center mx-auto mb-6 
            shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border-2 border-white/30'>
            <div className="relative z-10 text-4xl">🚀</div>
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#ff6b47] transition-all duration-300'>
            Fast Delivery
          </h3>
          <p className='text-gray-600 leading-relaxed'>Get your favorite food delivered to your doorstep in no time with our express delivery service</p>
        </div>
        <div className='group text-center transform hover:scale-105 transition-all duration-300'>
          <div className='w-24 h-24 bg-gradient-to-br from-[#27ae60] via-[#2ecc71] to-[#58d68d] rounded-3xl flex items-center justify-center mx-auto mb-6 
            shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border-2 border-white/30'>
            <div className="relative z-10 text-4xl">🌿</div>
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#27ae60] transition-all duration-300'>
            Fresh Ingredients
          </h3>
          <p className='text-gray-600 leading-relaxed'>We use only the freshest ingredients for all our dishes, sourced locally daily</p>
        </div>
        <div className='group text-center transform hover:scale-105 transition-all duration-300'>
          <div className='w-24 h-24 bg-gradient-to-br from-[#a29bfe] via-[#6c5ce7] to-[#8b5cf6] rounded-3xl flex items-center justify-center mx-auto mb-6 
            shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border-2 border-white/30'>
            <div className="relative z-10 text-4xl">👑</div>
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#6c5ce7] transition-all duration-300'>
            Premium Quality
          </h3>
          <p className='text-gray-600 leading-relaxed'>Experience premium quality food crafted with care by our expert chefs</p>
        </div>
      </div>
    </section>

    {/* Removed decorative elements for cleaner design */}
    </div>
    </>
  )
}

export default Home