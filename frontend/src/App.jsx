import React ,{useState} from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup';

function App() {
  const [show , setShow]=useState(false);

  return (
    <>
     {show ? <LoginPopup setShow={setShow}/> : <></>}
    <div className='h-screen  w-[80%]  m-auto font-outfit  '>
      <Navbar setShow={setShow}/>
      <Outlet/>
      <Footer/>

    </div>
    
    </>
  )
}

export default App