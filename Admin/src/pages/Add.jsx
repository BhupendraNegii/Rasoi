import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Add() {


    const url = 'http://localhost:3000';

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });


    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;


        setData(data => ({ ...data, [name]: value }));//[field value]:new Vlaue
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        if (!image) {
            toast.error("Please upload an image");
            return;
        }

        if (!data.name || !data.price || !data.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", image);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (response.data.success) {
                toast.success("Item Has Been Added");
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                })
                setImage(false)
            } else {
                toast.error(response.data.message || "Error Occurred while saving");
            }
        } catch (error) {
            console.error("Error adding food:", error);
            toast.error(error.response?.data?.message || "Error Occurred while saving");
        }

    }







    return (
        <div className='add w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-[16px]'>

            <form className='flex flex-col gap-[20px]  ' onSubmit={onSubmitHandler}>
                <div className="addimg flex flex-col gap-[10px]">
                    <p className='text-black capitalize'>Upload Image</p>
                    <label htmlFor="image">
                        <img className='w-[120px] max-h-[120px] object-cover object-center' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} className='p-[10px] ' type="file" id='image' hidden required />
                </div>
                <div className="app-product-name w-[max(40%,280px)]  flex flex-col gap-[10px] ">

                    <p className='text-black capitalize '>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' className='bg-[#F8F8F8] py-3 px-2' placeholder='Type here' />

                </div>

                <div className="add-product-description w-[max(40%,280px)]  flex gap-1 flex-col">
                    <p className='text-black capitalize'>Product description </p>
                    <textarea onChange={onChangeHandler} value={data.description} className='p-[10px] bg-[#F8F8F8] ' name="description" rows="6" placeholder='Type Description here' ></textarea>
                </div>
                <div className='addCategory flex gap-5'>

                    <div className="add-category  flex flex-col gap-[10px]">

                        <p className='text-black'>Product</p>
                        <select onChange={onChangeHandler} value={data.category} className='max-w-[120px] p-[10px] ' name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="adddprice   flex flex-col   gap-[10px]" >
                        <p className='text-black'>Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" className='outline-none max-w-[120px] p-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  border-[1.2px ' name='price' placeholder='₹20' />
                    </div>
                </div>
                <button type='submit' className=' max-w-[120px] bg-black rounded-lg text-white py-1 px-2'>ADD</button>

            </form>



        </div>
    )
}

export default Add
