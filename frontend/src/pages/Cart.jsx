import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

function Cart() {

  const { cardItem,getCartTotal, removeFromCart,food_list ,url } = useContext(StoreContext);

  const navigate = useNavigate();

  const nextP= ()=> {
    if(getCartTotal() > 0 ){
      navigate('/order')
    }
  }

  return (
    <>

    <div className='mt-[100px] ' >

      <div className="cartItem" >
        <div className="tittle text-gray-500 text-[max(0.9vw,12px)] grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr  />
        {food_list.map((item,index)=>{
          const itemId = item._id || item.id;
          const quantity = cardItem[itemId] || cardItem[item._id] || cardItem[item.id] || 0;
          if(quantity > 0){
            return(
              <React.Fragment key={itemId || index}>
              
              <div className="my-[10px] mx-0 tittle text-gray-500 text-[max(1vw,12px)] grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr]">
                      <img src={url + "/images/" + item.image} className='w-[50px] rounded-md' alt="" />  
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{quantity}</p>
                      <p>₹{(item.price * quantity).toFixed(2)}</p>
                      <p className='font-semibold cursor-pointer ' onClick={()=>removeFromCart(itemId)}>X</p>
              </div>
              <hr className='h-[1px] bg-[#e2e2e2] border-none  ' />
              </React.Fragment>
            )
          }
          return null;
        })}
        
      </div>

      <div className="mt-20   flex justify-between gap-[max(12vw,20px)] ">
        <div className="flex-1 flex flex-col gap-5 ">
          <h2 className='text-xl'>Cart Total</h2>
          <div className="">
            <div className="cartTota flex justify-between text-[#555]">
              <p>Sub-Total</p>
              <p>₹{getCartTotal().toFixed(2)}</p>
            </div>
            <hr className='my-[10px] mx-0' />
            <div className="cartTota flex justify-between text-[#555]">
              <p>Delivery-Fee</p>
              <p>₹{getCartTotal() === 0 ? 0 : 2}</p>
            </div>
            <hr className='my-[10px] mx-0'  />
            <div className="cartTota flex justify-between text-[#555]">
              <b>Total</b>
              <p>₹{getCartTotal() === 0 ? 0 : (getCartTotal() + 2).toFixed(2)}</p>
            </div>
          </div>
            <button onClick={nextP}  className={`border-none text-white ${getCartTotal()=== 0 ? `bg-gray-700 cursor-not-allowed` : `bg-orange-600 cursor-pointer` } w--[max(15vw,200px] py-3 px-0 rounded-lg`}  >Proceed To CheckOut</button>
        </div>
        <div className="flex-1  ">
          <div >
            <p className='text-[#555] '>if you have any promo-code, Enter here</p>
            <div className="mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[4px] ">
              <input className='bg-transparent rounded-lg  border-none outline-none pl-[10px]' type="text" placeholder='PromoCode' />
              <button className='text-white bg-black rounded-lg  w-[max(10vw,150px)] py-3 px-1 border-none'>Submit</button>
            </div>
          </div>
        </div>
      </div>


    </div>


    </>
  )
}

export default Cart
