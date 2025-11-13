import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <>
      <div className="text-[#d9d9d9] mt-[100px] rounded-lg bg-[#323232] flex items-center flex-col gap-5 py-5 px-[8vw] " id='footer'>
        <div className="w-full gap-5 grid grid-cols-[2fr_2fr_1fr]">
            <div className=" flex flex-col items-start gap-5 ">
                <h1 className='text-2xl font-bold text-white'>Rasoi.</h1>
                <p>© 2025 Rasoi | <span className='text-sm'>Your Favorite Food, Delivered Fast.
                At Rasoi, we bring the best dishes from your favorite local restaurants right to your doorstep. Whether you're craving something sweet, savory, or spicy, we've got you covered. Download our app and experience the fastest food delivery in town!</span> </p>
                <div className="flex gap-2">
                    <img className='invert' src={assets.facebook_icon} alt="" />
                    <img className='invert' src={assets.twitter_icon} alt="" />
                    <img className='invert' src={assets.linkedin_icon} alt="" />
                </div>

            </div>
            <div className="center flex flex-col items-start gap-5 ">
                <h2 className='text-xl font-semibold text-white '>Company</h2>
                <ul className='flex flex-col gap-2'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>About US</li>
                    <li className='cursor-pointer'>Delivery</li>
                    <li className='cursor-pointer'>Privacy policy</li>
                </ul>

            </div>
            <div className="right flex flex-col items-start gap-5 ">

                <h2 className='text-xl font-semibold text-white'>Get in Touch !</h2>
                <ul className='flex flex-col gap-2'>
                    <li>7302863259</li>
                    <li>negibhupendra22@gmail.com</li>
                </ul>

            </div>
        </div>
        <hr className='w-full h-[2px] my-5 mx-0 rounded-lg bg-gray-300 border-none' />
        <p className=''>Copyright 2025 ©️ Rasoi.com - All Right Reserved</p>
      </div>
    </>
  )
}

export default Footer
