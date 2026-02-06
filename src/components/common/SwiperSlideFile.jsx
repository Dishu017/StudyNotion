import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import CourseCard from './CourseCard';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel } from 'swiper/modules';


const SwiperSlideFile = ({slideData}) => {

    if(!slideData) {
        return (
            <div>No Data inside SwiperSlide</div>
        )
    }

    return (
    <div className=''>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            autoplay={{
                delay: 2500,       // time between slides
                disableOnInteraction: false, // keep autoplay running even after manual swipe
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {
                slideData?.map((ele, index) => (
                    <SwiperSlide key={index}>
                        <CourseCard courseCardData={ele}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>)       
}

export default SwiperSlideFile
