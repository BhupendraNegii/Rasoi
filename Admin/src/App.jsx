import React from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className='font-outfit bg-[#fcfcfc]'>
      <Navbar/>
      <ToastContainer />
      <hr className='h-[1px] bg-[#a9a9a9] ' />
      <div className="app-content flex">
        <SideBar/>
        <Outlet/>
      </div>

      
    </div>
  )
}

export default App
