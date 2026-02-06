import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { getCoursesData } from '../services/operations/getCourses';
import { toast } from 'react-toastify';
import ProgressBar from "@ramonak/react-progress-bar";


const EnrolledCourses = () => {

    const [selected, setSelected] = useState("All");
    const dispatch = useDispatch();
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const navigate = useNavigate();

    const { courseReload } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const data = [
        {value: "All"}, 
        {value: "Pending"}, 
        {value: "Completed"}
    ];

    let responseArray = [];

    const getUserEnrolledCourses = () => {
        try {
            dispatch(getCoursesData(token, setEnrolledCourses));
        }
        catch(error) {
            console.log(error);
        }
    }

    const handleNavigate = (ele) => {
        console.log("Clicked", enrolledCourses);
        console.log("handleNavigate", ele);
        navigate(`/view-course/${ele?._id}`);
    }

    useEffect(() => {
        getUserEnrolledCourses();
    }, []);

    useEffect(() => {
        if(enrolledCourses.length === 0) {
            toast.success("Tray is empty...kindly get a course and try again!");
            //return(<div className='w-full h-[calc(100vh - 3.5rem)] flex items-center justify-center text-white bg-richblack-900'>No Course found</div>)
        }
    }, [enrolledCourses]);

    return (
        <div className='w-9/12 mx-auto mt-5'>
            <div className='flex flex-row gap-x-3 items-center'>
                <Link to="/">Home</Link>
                <p><IoIosArrowForward /></p>
                <Link to="/dashboard">Dashboard</Link>
                <p><IoIosArrowForward /></p>
                <Link to="/dashboard/enrolled-courses" className='text-amber-200'>Enrolled Courses</Link>
            </div>
            <h1 className='text-2xl font-bold mt-6'>Enrolled Courses</h1>
            {/* <div className='flex flex-row bg-richblack-600 w-fit rounded-full gap-x-4 px-3.5 mt-5 py-2 text-[1rem]'>
                <button onClick={() => setSelected("All")} className={`${selected === "All" ? "bg-richblack-800": ""}`}>All</button>
                <button onClick={() => setSelected("Pending")}>Pending</button>
                <button onClick={() => setSelected("Completed")}>Completed</button>
            </div> */}
            <div className='flex flex-row bg-richblack-600 w-fit rounded-full gap-x-3 px-3 mt-5 py-2 text-[1rem]'>
                {
                    data.map((ele, index) => {
                        return <button key={index} onClick={() => setSelected(ele.value)}
                                className={`${ele.value === selected ? "bg-richblack-800": "bg-transparent"} rounded-full py-1 px-3.5 cursor-pointer`}>
                                    {ele.value}
                                </button>
                    })
                }
            </div>
            <div className='grid grid-cols-3 bg-richblack-600 px-4 py-3 mt-7 rounded-md justify-between text-[1.1rem]'>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
            </div>
            <div >
                {
                    enrolledCourses.length > 0 ?
                    <div className='mt-8 flex flex-col gap-y-4'>
                        {
                            enrolledCourses.map((ele, index) => {
                            return  (<div className='grid grid-cols-3 gap-x-4 cursor-pointer'
                                    onClick={() => handleNavigate(ele)}>
                                        <div className='flex gap-x-3' key={index}>
                                            <img src={ele.thumbnail} className='w-[78px] rounded-md'/>
                                            <div className='flex flex-col justify-start gap-y-3'>
                                                <p>{ele.courseName}</p>
                                                <p className='text-richblack-600 text-[0.9rem]'>{ele.courseDescription}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>{ele?.lectureTotalDuration ?? 0} </div>
                                        <div className='flex items-center'>
                                            {
                                                <ProgressBar
                                                    completed={ele.progressPercentage || 0}
                                                    maxCompleted={100}
                                                    height="16px"
                                                    width='300px'
                                                />
                                            }
                                        </div>
                                    </div>)
                            })
                        }
                    </div> :
                    <div className='flex flex-col items-center justify-center gap-y-5'>
                        <h2 className='text-[1.4rem]'>No courses found</h2>
                        <Link to={"/"} className='px-4 py-2 bg-amber-300 rounded-md text-richblack-900'>Buy Now!</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default EnrolledCourses;
