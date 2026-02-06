import React from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars'
import { FaRegStar } from "react-icons/fa6";
import { IoBagRemoveSharp } from "react-icons/io5";
import { removeFromCart } from '../redux/slices/cartSlice';

const Wishlist = () => {

    const { totalItems, cart, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className='w-9/12 mx-auto mt-5'>
            <div className='flex flex-row gap-x-3 items-center'>
                <Link to={"/"}>Home</Link>
                <FaChevronRight />
                <Link to={"/dashboard"}>Dashboard</Link>
                <FaChevronRight />
                <Link to={"/dashboard/wishlist"}><p className='text-amber-200'>Wishlist</p></Link>
            </div>
            <h1 className='font-bold text-[1.6rem] mt-5'>My Wishlist</h1>
            <p className='mt-4'>{totalItems} courses in Wishlist</p>
            <div className='h-[1px] w-full bg-richblack-700 mt-2'></div>
            <div className='flex flex-row gap-x-4'>
                <div>
                {
                    total > 0 ? 
                    (cart.map((ele,index) => {
                        return <div key={index} className='flex gap-x-5'>
                                    <div>
                                        <img src={ele.thumbnail}/>
                                        <div>
                                            <p>{ele.courseName}</p>
                                            <p>{ele?.category?.name}</p>
                                        </div>
                                        <div className='flex gap-x-3'>
                                                <span>4.8</span>
                                                <ReactStars
                                                    count={5}
                                                    size={20}
                                                    edit={false}
                                                    activeColor={'#ffd700'}
                                                    emptyIcon={<FaRegStar />}
                                                    fullIcon={<FaRegStar />}
                                                />
                                                <span>{ele?.ratingAndReviews?.ratings} Ratings</span>
                                        </div>
                                        <div className='flex flex-col gap-y-5'>
                                            <button onClick={() => dispatch(removeFromCart(ele))} 
                                            className='bg-richblack-600 rounded-md text-red-800 py-3 px-4'>
                                                <IoBagRemoveSharp className='text-red-800'/>
                                                <p>Remove</p>
                                            </button>
                                            <div>
                                                <p>Rs. <span className='text-amber-300'>{total}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className='bg-richblack-600 rounded-md p-5'>
                                        <p>Total</p>
                                        <p className='text-amber-300'>Rs. {total}</p>
                                        <p className='text-richblack-700 line-through'>Rs. {total + 600}</p>
                                        <button className='bg-amber-300 text-richblack-700 px-5 py-3'>
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                                    
                    })): 
                    (<div className='flex justify-center items-center mt-5 font-bold text-[1.3rem]'>
                        Cart is empty!
                    </div>)
                }
                </div>
            </div>
        </div>
    );
}

export default Wishlist
