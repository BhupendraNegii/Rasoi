import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const {getCartTotal , token , food_list , cardItem , url}= useContext(StoreContext);


  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });

  const onChangeHandler = (e)=>{
    const name = e.target.name ;
    const value = e.target.value ;
    setData(data=>({...data , [name]:value}));
  }

  const placeOrder = async(e)=>{
    e.preventDefault();
    
    if (!token) {
      alert("Please login to place an order");
      return;
    }

    const orderItems = [];
    food_list.forEach((item)=>{
      const itemId = item._id || item.id;
      const quantity = cardItem[String(itemId)] || cardItem[itemId] || 0;
      if(quantity > 0 ){
        let itemInfo = {...item};
        itemInfo["quantity"] = quantity;
        orderItems.push(itemInfo)
      }
    })

    if (orderItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    let orderData = {
      address : data,
      items: orderItems,
      amount:getCartTotal()+2
    }

    try {
      const response = await axios.post(`${url}/api/order/place` , orderData ,{headers : {token : token}});
      console.log(response.data)

      if(response.data.success) {
        const {session_url} = response.data;
        if (session_url) {
          window.location.replace(session_url);
        } else {
          alert("Payment session URL not received");
        }
      }
      else{
        alert(response.data.Error || response.data.message || "Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.response?.data?.Error || error.response?.data?.message || "Error placing order. Please try again.");
    }

  }
  const navigate = useNavigate();

  useEffect(()=>{

    if(!token){
      navigate('/cart');

    }else if(getCartTotal() === 0 ){
      navigate('/cart')

    }

  },[token]);




  return (
    <>
      <form onSubmit={placeOrder} className='flex justify-between items-center mt-20  gap-[20px]'>
        <div className="left w-full max-w-[max(40%,500px)] ">
             <p className='tittle text-[30px] font-600 mb-[50px]'>Delivery-Information</p>
             <div className="multiField text-gray-600 flex gap-[10px]">
              <input required name='firstName' onChange={onChangeHandler} value={data.firstName} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text" placeholder='First Name' />
              <input required name='lastName' onChange={onChangeHandler} value={data.lastName} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text" placeholder='Last Name' />
             </div>
             <input required name='email' onChange={onChangeHandler} value={data.email} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="email" placeholder='Email Address' />
             <input required name='street' onChange={onChangeHandler} value={data.street} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text"  placeholder='Street' />
             <div className="multiField text-gray-600 flex gap-[10px]">
              <input required name='city' onChange={onChangeHandler} value={data.city} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text" placeholder='City' />
              <input required name='state' onChange={onChangeHandler} value={data.state} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text" placeholder='State' />
             </div>
             <div className="multiField text-gray-600 flex gap-[10px]">
              <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text" placeholder='ZipCode' />
              <input required name='country' onChange={onChangeHandler} value={data.country} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text" placeholder='Country' />
             </div>
             <input required name='phone' onChange={onChangeHandler} value={data.phone} className='mb-[15px] w-full p-[10px] border-1 border-[#c5c5c5] rounded-[4px] outline-orange-500' type="text" placeholder='Phone' />
        </div>
        <div className="right  w-full max-w-[max(40%,500px)]">

        <div className="flex-1 flex flex-col gap-5 ">
          <h2 className='text-xl'>Cart Total</h2>
          <div className="">
          <div className="cartTota flex justify-between text-[#555]">
              <p>Sub-Total</p>
              <p>₹{getCartTotal()}</p>
            </div>
            <hr className='my-[10px] mx-0' />
            <div className="cartTota flex justify-between text-[#555]">
              <p>Delivery-Fee</p>
              <p>₹{getCartTotal() === 0 ? 0 : 2}</p>
            </div>
            <hr className='my-[10px] mx-0'  />
            <div className="cartTota flex justify-between text-[#555]">
              <b>Total</b>
              <p>₹{getCartTotal() === 0 ? 0 : getCartTotal() +2}</p>
            </div>
            <button type='submit'   className='border-none flex-1 text-white bg-orange-600 w--[max(15vw,200px] py-3 px-2 rounded-lg mt-4 '>Proceed To Payment</button>
          </div>
         </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder