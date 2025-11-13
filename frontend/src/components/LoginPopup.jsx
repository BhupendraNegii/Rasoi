import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios'

function LoginPopup({ setShow }) {

    const {url , token , setToken} = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Sign up");
    const [data ,setData] = useState({
        name:"",
        email : "",
        password: ""
    });

    const onChangeHandler = (e)=>{

        const name = e.target.name ;
        const value = e.target.value ;
        setData({...data , [name]:value});
    }

    const onLogin = async (e)=>{
        e.preventDefault();
        
        // Validation
        if (!data.email || !data.password) {
            alert("Please fill in all required fields");
            return;
        }
        
        if (currentState === "Sign up" && !data.name) {
            alert("Please enter your name");
            return;
        }

        let newUrl = url ;
        if(currentState === "Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }
        
        try {
            const connection = await axios.post(newUrl , data);
            if(connection.data.success){
                setToken(connection.data.token);
                localStorage.setItem("token" , connection.data.token);
                setShow(false);
                // Reset form
                setData({
                    name: "",
                    email: "",
                    password: ""
                });
                // Reset to Sign up state after successful login/register
                setCurrentState("Sign up");
            }else{
                // Show specific error message from backend
                const errorMessage = connection.data.message || connection.data.error || "An error occurred. Please try again.";
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Login/Register error:", error);
            // Better error handling
            if (error.response) {
                // Server responded with error
                const errorMessage = error.response.data?.message || error.response.data?.error || "Server error. Please try again.";
                alert(errorMessage);
            } else if (error.request) {
                // Request was made but no response received
                alert("Unable to connect to server. Please check your internet connection or ensure the backend server is running.");
            } else {
                // Something else happened
                alert("An unexpected error occurred. Please try again.");
            }
        }

        
    }




    return (
        <div 
            className='fixed inset-0 z-50 w-full h-full bg-[#00000090] flex items-center justify-center'
            onClick={(e) => {
                // Close modal when clicking on the backdrop
                if (e.target === e.currentTarget) {
                    setShow(false);
                }
            }}
        >
            <form 
                onSubmit={onLogin} 
                className=' rounded-2xl w-[max(23vw,330px)] text-[#808080] bg-white  flex flex-col gap-6 py-6 px-7 text-[14px] animate-fade2 '
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center text-black">
                    <h2 className='text-2xl '>{currentState}</h2>
                    <img onClick={() => setShow(false)} src={assets.cross_icon} className='cursor-pointer w-4' alt="" />
                </div>
                <div className="flex flex-col gap-5">
                    {currentState === "Login" ? <></> : <input name='name' value={data.name} onChange={onChangeHandler} type="text" className='border-1  outline-none focus:border-[#FF4C24] rounded-md py-1 px-2' placeholder='Your Name' required />}

                    <input name='email' value={data.email} onChange={onChangeHandler} type="email"  className='border-1  outline-none focus:border-[#FF4C24] rounded-md py-1 px-2' placeholder='Your Email' required />
                    <input name='password' value={data.password} onChange={onChangeHandler} type="password"  className='border-1  outline-none focus:border-[#FF4C24] rounded-md py-1 px-2' placeholder='password' required />
                </div>
               {currentState==="Sign up" ?  <div className="flex gap-2">
                    <input type="checkbox" className='peer border-none outline-none' required />
                    <p className='peer-checked:text-black'>By Continuing , i agree to the terms of use & privacy policiy</p>
                </div> : <></>}
                <button type='submit' className='border-none py-2 rounded-md bg-[#FF4C24] text-white px-1'>{currentState === "Sign up" ? "Sign up" : "Login"}</button>
                {currentState === "Sign up" ? <p className='text-gray-700 text-center'>Already have an account? <span className='cursor-pointer text-blue-600'   onClick={()=> setCurrentState("Login")}>Login here</span></p> : <p className='text-gray-700 text-center'>Create a new Account? <span className='cursor-pointer text-blue-600'   onClick={()=> setCurrentState("Sign up")}>Click here</span></p>
                }


            </form>

        </div>
    )
}

export default LoginPopup
