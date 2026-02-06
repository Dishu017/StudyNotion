import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getAllReviews } from "../../services/operations/getCourses";
import RatingStars from './RatingStars';

const ReviewSliderSection = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const initialRun = async () => {
            const response = await getAllReviews();
            console.log("Response recieved is", response);
            setReviews(response);
        };
        initialRun();
    }, []);

    return (
        <div className='w-screen px-20 py-10'>
            <div className='w-9/12 mx-auto'>
                <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, A11y, Scrollbar]}
                loop
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 2500,       // time between slides
                    disableOnInteraction: false, // keep autoplay running even after manual swipe
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                {
                    reviews?.map((review, index) => {
                        return (<SwiperSlide key={index} className='my-10'>
                                <div className='w-[260px] h-fit p-4 rounded-md bg-richblack-700 text-white flex flex-col'>
                                    <div className='flex gap-x-1 justify-around'>
                                        <img src={review?.user?.image} className='w-[50px] rounded-full'/>
                                        <div>
                                            <p className='flex gap-x-1'>
                                                <span>{review?.user?.firstName}</span>
                                                <span>{review?.user?.lastName}</span>
                                            </p>
                                            <p>{review?.course?.courseName}</p>
                                        </div>
                                    </div>
                                    <div className='my-5 px-5'>
                                        <p>{review?.review}</p>
                                    </div>
                                    <div  className='px-5 flex gap-x-4'>
                                        <div>{review?.rating}</div>
                                        <div><RatingStars Review_Count={review?.rating}/></div>
                                    </div>
                                </div>
                            </SwiperSlide>)
                    })
                }
                </Swiper>
            </div>
        </div>

        )
}

export default ReviewSliderSection;
