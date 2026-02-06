import React, { useEffect, useState } from 'react'
import { getInstructorDashboardDataset } from '../services/operations/getCourses';
import { useSelector } from 'react-redux';
import InstructorCharts from '../components/Dashboard/InstructorFolder/InstructorCharts';
import InstructorCard from '../components/Dashboard/InstructorFolder/InstructorCard';

const Instructor = () => {

    const { token } = useSelector((state) => state.auth);
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        const initialRun = async () => {
            const coursesArray = await getInstructorDashboardDataset(token);
            if(!coursesArray) {
                return;
            }
            setDataArray(coursesArray);    
        }
        initialRun();
    }, []);

    console.log("Data to render is -->", dataArray);

    return (
        <div className='w-9/12 mx-auto mt-10 mb-10'>
            <div className='flex justify-center gap-x-3.5 h-[400px]'>
                <div className='w-[40%]'>
                    <InstructorCharts courses={dataArray}/>
                </div>
                {/* Statistics */}
                <div className='w-[20%] bg-richblack-700/50 px-8 py-4 flex flex-col gap-y-5'>
                    <div className='text-3xl text-white font-bold'>Stats</div>
                    <div className='flex flex-col gap-y-5 mt-8'>
                        <div className='flex flex-col '>
                            <p className='text-richblack-300'>Total Courses</p>
                            <p className='text-white text-[1.3rem]'>{dataArray.length}</p>
                        </div>
                        <div>
                            <p className=' text-richblack-300'>Total Students</p>
                            <p className='text-white text-[1.3rem]'>{dataArray.reduce((acc, ele) => acc + ele?.totalStudentsEnrolled, 0)}</p>
                        </div>
                        <div>
                            <p className='text-richblack-300'>Total Income</p>
                            <p className='text-white text-[1.3rem]'>{dataArray.reduce((acc, ele) => acc + ele.totalAmountEarned, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[62%] mt-5 mx-auto bg-richblack-700/50 h-fit rounded-md'>
                {
                    <InstructorCard courses={dataArray}/>
                }
            </div>
        </div>
    );
}

export default Instructor;
