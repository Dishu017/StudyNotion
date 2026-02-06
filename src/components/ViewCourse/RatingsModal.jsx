import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { Rating } from 'react-simple-star-rating'
import { createRatingAndReview } from '../../services/operations/studentFeaturesAPI';
import { MdToken } from 'react-icons/md';


const RatingsModal = ({setReview, courseId}) => {

    const { user } = useSelector((state) => state.profile);
    const [rating, setRating] = useState(null);
    const { token } = useSelector((state) => state.auth);

    const handleRating = (newRating) => {
        console.log("Rating is:", newRating);
        setRating(newRating);
    }

    const {
        handleSubmit, 
        register,
        setValue,
        formState: {errors}
    } = useForm();

    async function onFormSubmit (data) {
        const formdata = new FormData();
        formdata.append("rating", rating);
        formdata.append("review", data.textField);
        formdata.append("courseId", courseId);
        // console.log("CourseId", courseId);
        // console.log(formdata);
        await createRatingAndReview(token, formdata);
        setReview(false);
    }

    return (
        <div className='fixed inset-0 bg-richblack-800/15 backdrop-blur-sm flex items-center justify-center'>
            <div className='lg:w-[550px] w-[300px] border-1 border-richblack-100 bg-richblack-800 rounded-md'>
                <div className='flex justify-between items-center bg-richblack-700 px-4 py-4'>
                    <div>Add Review</div>
                    <div className="cursor-pointer" 
                    onClick={() => setReview(false)}><ImCross /></div>
                </div>
                <div className='flex justify-center items-center px-4 bg-richblack-800 gap-x-5 pt-5 w-full'>
                    <img src={user?.image} className='w-[50px] h-[50px] rounded-full'/>
                    <div className='flex flex-col'>
                        <div>{user?.firstName} {user?.lastName}</div>
                        <div>Creating Publicly</div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col gap-y-3 w-[85%] pb-5 mx-auto bg-richblack-800'>
                    <div className='mx-auto pt-5'>
                        <Rating
                            onClick={handleRating}
                            className='flex'
                            // onPointerEnter={onPointerEnter}
                            // onPointerLeave={onPointerLeave}
                            // onPointerMove={onPointerMove}
                            /* Available Props */
                            SVGstyle={{ display: "inline-block" }}
                            allowFraction
                            size={32}
                        />
                    </div>
                    <label htmlFor='textField'>Add Your Experience</label>
                    <textarea id="textField" {...register("textField", {required: true})} 
                    className='w-full mx-auto bg-richblack-700 rounded-md h-[180px] px-3 py-2'/>
                    <div className='flex gap-x-3 justify-end'>
                        <button onClick={() => setReview(false)}
                        className='cursor-pointer bg-richblack-700 rounded-md py-2 px-3'>Cancel</button>
                        <button type='submit'
                        className='cursor-pointer bg-amber-300 text-richblack-800 rounded-md py-2 px-3'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RatingsModal;
