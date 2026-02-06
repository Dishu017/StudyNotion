import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Th, Thead, Tr, Td } from 'react-super-responsive-table'
import { fetchAllInstructorCourses, getCompleteCourseDetails } from "../services/operations/courseDetailsAPI"
import { RiTimerFill } from "react-icons/ri";
import { COURSE_STATUS } from "../utils/stateCourse"
import { FaRegCircleCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from '../redux/slices/courseSlice';
import { deleteCourse } from "../services/operations/courseDetailsAPI";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyCourses = () => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAllCourses = async () => {
        const response = await fetchAllInstructorCourses(token);
        if(response) {
            setCourses(response);
        }
    }

    const editHandler = async (courseId) => {
        const response = await getCompleteCourseDetails(token, {courseId});
        if(response) {
            console.log(response)
            dispatch(setCourse(response));
        }
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
        navigate("/dashboard/add-course");
    };

    const deleteHandler = async (courseId) => {
        const response = await deleteCourse({courseId});
        if(response?.data?.success) {
            toast.success("Course deleted successfully!");
        }
        fetchAllCourses();
    }

    const publishHandler = async (courseId) => {
        const response = await getCompleteCourseDetails(token, {courseId});
        if(response) {
            console.log(response);
            dispatch(setCourse(response))
        }
        dispatch(setStep(3));
        dispatch(setEditCourse(true))
        navigate("/dashboard/add-course");
    }

    useEffect(() => {
        fetchAllCourses()
    }, []);

    return (
        <div className='lg:px-35 py-5'>
            <div className='flex justify-between items-center mt-7 mb-7'>
                <div className='text-2xl font-bold'>My Courses</div>
                <Link to={"/dashboard/add-course"}>
                    <button 
                    className='px-4 py-2 bg-amber-300 text-richblack-800 rounded-md
                    cursor-pointer'>
                        + Add Course
                    </button>
                </Link>
            </div>
            <table className='border-[1px] border-richblack-800 border-spacing-y-4 border-spacing-x-0 border-separate'>
                <thead>
                    <tr>
                        <th className='text-left px-5'>
                            Courses 
                        </th>
                        <th className='text-center w-1/8'>
                            Duration 
                        </th>
                        <th className='text-center w-1/8'>
                            Price 
                        </th>
                        <th className='text-center w-1/8'>
                            Actions 
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        courses?.length === 0 ? 
                        (<tr>
                            <td>
                                No Courses Found
                            </td>
                        </tr>) : 
                        (
                            courses?.map((course) => (
                                <tr key={course?._id} className='rounded-md p-[20px]'>
                                    <td className='flex gap-x-5 w-fit px-5'>
                                        <img
                                            src={course?.thumbnail}
                                            className='w-[290px] h-[190px] rounded-md'
                                        />
                                        <div className='flex flex-col justify-around'>
                                            <p className='text-[1.5rem]'>
                                                {course?.courseName}
                                            </p>
                                            <p className='text-richblack-300'>{course?.courseDescription}</p>
                                            <p className='text-[0.9rem]'>Created:</p>
                                            <p 
                                            className='cursor-pointer flex items-center gap-x-2
                                             bg-richblack-800 rounded-full px-3 py-2 text-[0.9rem]'
                                            onClick={() => publishHandler(course._id)}> 
                                                {
                                                    (course?.status === COURSE_STATUS.DRAFT) ?
                                                    (<span className='text-blue-300'>
                                                        <RiTimerFill size={20}/>
                                                    </span>) : 
                                                    (
                                                        <span className='text-amber-700'>
                                                            <FaRegCircleCheck size={20}/>
                                                        </span>
                                                    )
                                                }
                                                {course?.status}
                                            </p>
                                        </div>
                                    </td>
                                    <td className='text-center w-1/8'>
                                        2h 30min
                                    </td>
                                    <td className='text-center w-1/8 '>
                                        {`$ ${course?.price}`}
                                    </td>
                                    <td className='text-center w-1/8 '>
                                        <button
                                        onClick={() => editHandler(course._id)}
                                        className='px-2 cursor-pointer text-amber-300'>
                                            <CiEdit size={23}/>
                                        </button>
                                        <button
                                        className='px-2 cursor-pointer text-red-600'
                                        onClick={() => deleteHandler(course._id)}>
                                            <MdDelete size={23}/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyCourses;
