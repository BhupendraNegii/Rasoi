import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50/40 via-yellow-50/30 to-transparent relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-tl from-green-200/15 to-transparent rounded-full blur-3xl animate-bounce delay-500"></div>
        
        <div className="text-center relative z-10">
          <div className="mb-8">
            <LoadingSpinner size="large" color="rainbow" />
          </div>
          <h2 className="text-3xl font-bold text-orange-500 mb-4 animate-pulse">
            Loading Rasoi...
          </h2>
          <p className="text-gray-700 text-lg font-medium">Preparing your delicious experience</p>
          <div className="mt-6 flex justify-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-100"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {show && <LoginPopup setShow={setShow} />}
      <div className='min-h-screen w-[80%] m-auto font-outfit animate-fade relative'>
        {/* Subtle background color sections */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-orange-50/30 via-yellow-50/20 to-transparent"></div>
          <div className="absolute top-1/3 right-0 w-3/4 h-96 bg-gradient-to-l from-green-50/20 via-transparent to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-96 bg-gradient-to-t from-purple-50/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <Navbar setShow={setShow} />
        <main className="transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App