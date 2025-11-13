import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios';
import { assets } from '../assets/assets';

function MOrders() {

    const {token , url}= useContext(StoreContext)

    const [data ,setData] = useState([]);

    const fetchOrder = async()=>{
        try {
            const response = await axios.post(`${url}/api/order/userorders` ,{} , {headers : {token : token}});
            if (response.data.success) {
                setData(response.data.data || []);
            } else {
                console.error("Error fetching orders:", response.data.message);
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setData([]);
        }
    }

    useEffect(()=>{
        if(token) fetchOrder();
    },[token])


  return (
    <div className='myorder  my-[50px] mx-0 '>
       <h2>My Orders</h2>
       <div className="container  flex flex-col gap-5 mt-[30px]">
        {data && data.length > 0 ? data.map((order,index)=>{
            return (
                <div key={order._id || order.id || index} className="orderss w-[89vw] border-[1px] rounded-md border-orange-500  items-center gap-[30px] text-[14px] text-[#454545] py-[10px] px-[15px] grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] ">
                    <img className='w-[50px] ' src={assets.parcel_icon} alt="" />
                    <p  className='text-gray-600'>{order.items && order.items.map((itemn , idx)=>{
                        if(idx === order.items.length -1){
                            return itemn.name+ " X" + itemn.quantity
                        }
                        else{
                            return itemn.name+ " X" + itemn.quantity+", "
                        }
                    })}</p>
                    <p>₹{order.amount || 0}.00</p>
                    <p>Items : {order.items ? order.items.length : 0}</p>
                    <p className='flex gap-2'><span className='text-orange-500'>&#x25cf;</span><b className='font-semibold'>{order.status || order.Status || 'Pending'}</b></p>
                    <button onClick={fetchOrder} className='py-1 text-white px-2 bg-orange-500 rounded-md'>Track order</button>
                </div>
            )
        }) : <p className='text-gray-500'>No orders found</p>}
       </div>
    </div>
  )
}

export default MOrders
