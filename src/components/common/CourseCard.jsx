import React, { useEffect, useState } from 'react'
import { getAverageRatings } from '../../services/operations/categoryAPI';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

const CourseCard = ({courseCardData, Height}) => {

    console.log("Data is", courseCardData);

    if(!courseCardData) {
        return(<div>
            No Data in Card
        </div>)
    }

    const courseId = courseCardData?._id;
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const initialRun = async () => {
            console.log("Id is ", courseId);
            const result = await getAverageRatings({courseId});
            console.log("Result is:", result);
            setAverageRating(result);
        }
        initialRun();
    }, []);

    return (
        <Link to={`/courses/${courseId}`}>
            <div className='flex flex-col gap-y-3 my-5'>
                <div className={`${Height ? "lg:w-[500px] lg:h-[300px]": "lg:w-[350px] lg:h-[200px]"} sm:w-[200px] sm:h-[130px] 
                overflow-hidden rounded-md`}>
                    <img 
                    src={courseCardData.thumbnail}
                    className='rounded-md object-cover'
                    />
                </div>
                <p className='text-richblack-50 text-[1.2rem]'>
                    {courseCardData.courseName}
                </p>
                <div className='flex flex-row gap-x-3 items-center'>
                    <div className='text-[1.2rem] font-bold'>
                        {console.log("rating is", courseCardData?.ratingAndReviews?.rating)}
                        {courseCardData?.ratingAndReviews?.rating || 0}
                    </div>
                    <RatingStars Review_Count={averageRating}/>
                </div>
                <div className='text-richblack-50 text-[1.1rem]'>Rs. {courseCardData?.price}</div>
            </div>
        </Link>
    )
}

export default CourseCard;
