import React from 'react'
import { assets } from '../assets/assets'

function AppDownload() {
  return (
    <div id='app-download' className=' text-center flex flex-col items-center font-500  mt-[100px] text-[max(3vw,20px)]'>

        <p>For Better Experience Download <br />Rasoi App</p>
        <div className="flex justify-center gap-[max(2vw,10px)] mt-10 ">
            <img className='w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition-all ease-linear hover:scale-[1.05]' src={assets.play_store} alt="" />
            <img className='w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition-all ease-linear hover:scale-[1.05]' src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default AppDownload
