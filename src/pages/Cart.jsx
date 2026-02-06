import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getAverageRatings } from '../services/operations/categoryAPI';
import CartItem from '../components/common/CartItem';
import { FaRupeeSign } from "react-icons/fa";
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Cart = () => {

    const { cart, totalItems, total, cartCourseArray } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    console.log("Inside Cart", cart, totalItems);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Here", cartCourseArray)

    function buyHandler() {
        buyCourse(token, cartCourseArray, user, navigate, dispatch);
    }

    return (
        <div className='w-full mx-auto mt-10'>
            <div className='w-9/11 mx-auto text-[1.3rem]'>{totalItems} Course(s) inside Cart</div>
            <hr className='text-richblack-600 w-9/11 mx-auto mt-5'></hr>
            <div className='flex gap-x-3 mx-auto w-9/11 justify-between'>
                <div>
                {
                    cart.map((item, index) => {
                        return (<CartItem key={index} item={item}/>)
                    })
                }
                </div>
                <div className='mt-10 flex flex-col items-start bg-richblack-600/45 w-[22%] px-5 gap-y-4 justify-around rounded-md h-fit py-10'>
                    <div className='text-[1.2rem]'>Total</div>
                    <div className='text-amber-500 text-[1.6rem] flex items-center'>
                        <span><FaRupeeSign/></span>
                        <span>{total}</span>
                    </div>
                    <button 
                    className='bg-amber-300 text-richblack-800 py-2 px-3 text-[1.2rem] 
                    w-[90%] cursor-pointer rounded-md'
                    onClick={buyHandler}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
