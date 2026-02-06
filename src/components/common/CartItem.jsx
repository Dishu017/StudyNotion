import React, { useEffect } from 'react'
import { getAverageRatings } from '../../services/operations/categoryAPI';
import { MdAutoDelete } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import RatingStars from './RatingStars';
import { removeFromCart } from '../../redux/slices/cartSlice';

const CartItem = ({item}) => {

    const [averageRating, setAverageRating] = useState(0);
    const dispatch = useDispatch();

    // dispatch(resetCart());

    useEffect(() => {
        const initialRun = async () => {
            console.log("Id is ", item._id);
            const result = await getAverageRatings({courseId: item._id});
            console.log("Result is:", result);
            setAverageRating(result);
        }
        initialRun();
    }, []);

    return (
        <div className='flex flex-row justify-between mt-10 text-[1.1rem] mb-10'>
            <div className='flex gap-x-5 min-w-0'>
                <div className='md:w-[300px] h-[200px] shrink-0 rounded-md overflow-hidden'>
                    <img src={item.thumbnail} className='object-fill rounded-md w-full h-full'/>
                </div>
                <div className='flex flex-col justify-around'>
                        <div>{item.courseName}</div>
                        <div className='line-clamp-2 break-words'>{item.courseDescription}</div>
                        <div className='flex gap-x-3 items-center'>
                            <span>{item.ratingAndReviews?.rating || 0}</span>
                            <span>
                                <RatingStars Review_Count={averageRating}/>
                            </span>
                        </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-4 shrink-0'>
                <button 
                onClick={() => dispatch(removeFromCart(item))}
                className='bg-richblack-700 rounded-md cursor-pointer py-2 px-3
                flex items-center gap-x-2 text-[1.2rem] text-red-500'>
                    <span><MdAutoDelete /></span>
                    <span>Remove</span>
                </button>
                <div className='flex gap-x-1 text-amber-300 items-center text-[1.6rem]'>
                    <FaRupeeSign />
                    <span>{item.price}</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
