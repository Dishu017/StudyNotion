import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const InstructorCard = ({courses}) => {

    return (
        <div className='w-full h-full px-4 py-4'>
            <div className='flex justify-between w-full'>
                <p className='text-2xl'>Your Courses</p>
                <div className='text-amber-600 underline cursor-pointer'>
                    <Link to={'/dashboard/my-courses'}>
                        View All
                    </Link>
                </div>
            </div>
            <div className='w-full flex justify-between gap-x-3 mt-5'>
                {
                    courses?.slice(0,3)?.map((course, index) => (
                        <div className='bg-richblack-800/50 rounded-md w-1/3 flex flex-col gap-y-3'>
                            <img src={course?.thumbnail} className='w-full object-fill h-[160px]'/>
                            <div>{course?.name}</div>
                            <div className='flex text-[0.8rem]'>
                                <span>{course?.totalStudentsEnrolled} Students Enrolled | Rs. {course?.price}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default InstructorCard;
