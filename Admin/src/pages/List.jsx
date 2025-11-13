import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function List() {

  const url = 'http://localhost:5001'

  const [list ,setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      const data = await response.data.foodItem ;
        // console.log(response.data.foodItem)

        setList(data)
        console.log(list)
        // toast.error("Error Occurred");
      
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error Occurred while fetching the list");
    }
  };

  const removeHandler= async (id)=>{
    try {
      console.log('Removing item with ID:', id);
      const remove = await axios.post(`${url}/api/food/remove`, {id:id});
      
      if(remove.data.success){
        toast.success("Removed");
        await fetchList();
      }else{
        toast.error(remove.data.message || "Error while removing");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error(error.response?.data?.message || "Error while removing");
    }
  }

  useEffect(()=>{

    fetchList();

  },[])

  return (
    <div className='list add flex-col'>

      <p>All Foods Lists</p>
      <div className="listTable">
         < div className="listTableformat min-w-[80vw] bg-[#f9f9f9] grid border-[1px] border-[#cacaca] text-[13px] grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-[10px] py-3 px-[15px]  tittle">
              <p>Images</p>
              <p>Name</p>
              <p>Category</p>
              <p>Price</p>
              <p>Action</p>
        </div>
        {list.map((item,index)=>(
          <div key={index} className="listTableformat grid border-[1px] border-[#cacaca] text-[13px] grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-[10px] py-3 px-[15px] ">
            <img src={`${url}/images/${item.image}`} className='w-13' alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={()=>removeHandler(item._id || item.id)}  className='font-semibold cursor-pointer'>X</p>
          </div>
        ))}
      </div>
        

      
    </div>
  )
}

export default List
