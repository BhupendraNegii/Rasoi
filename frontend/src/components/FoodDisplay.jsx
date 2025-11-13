import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import FoodItem from './FoodItem';


function FoodDisplay({category}) {
    const {food_list} = useContext(StoreContext);

  return (
    <div className='mt-8  ' id='foodDisplay'>
        <h2 className='font-medium text-[max(2vw,24px)]'>Top Dishes near you</h2>
        <div className="grid grid-cols-list mt-8 gap-8 gap-y-[50px] ">
            {food_list.map((item,index)=>{

              if (category==="All" || category=== item.category) {
               return <FoodItem key={index} item={item} />
              }

            }
                
            )}
        </div>


      
    </div>
  )
}

export default FoodDisplay
