import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import { getCompleteCourseDetails } from '../../services/operations/courseDetailsAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewCourseSideBar = ({setReview, setIsActive, isActive}) => {

    const navigate = useNavigate();

    const { courseId, sectionId, subSectionId } = useParams();

    const { 
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    function handleReviewAddition() {
        setReview(true);
    }

    const handleNavigateToSection = (section) => {
        navigate(`/view-course/${courseId}/section/${section?._id}/sub-section/${section?.subSectionData[0]?._id}`)
    }

    const handleChecked = (subSectionId) => {
        return completedLectures?.includes(subSectionId);
    }

    function handleClickToNavigate(section, subSection) {
        console.log("Inside Naviagte", section?._id, subSection?._id);
        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`)
    }

    //console.log("Entire data is viewcoursesidebar:", courseEntireData);

    return (
        <div className='w-[330px] bg-richblue-900 h-[calc(100vh-3.5rem)] '>
            <section className='flex flex-row flex-wrap justify-between px-5 pt-10'>
                <button 
                onClick={() => navigate(`/dashboard/enrolled-courses`)}
                className='w-[50px] h-[50px] grid place-items-center cursor-pointer rounded-full bg-richblack-600 text-richblack-100 flex-shrink-0'>
                    <FaChevronLeft />
                </button>
                <button 
                onClick={handleReviewAddition}
                className='bg-amber-300 text-richblack-800 py-2 px-3 rounded-md cursor-pointer'>
                    Add Review
                </button>
            </section>
            <section className='px-5 pt-5 flex flex-col justify-around'>
                <div className='text-2xl'>{courseEntireData?.courseDescription}</div>
                <div className='text-2xl'>{completedLectures?.length}/{totalNoOfLectures}</div>
            </section>
            <hr className='text-richblack-600 w-[90%] mx-auto mt-10 mb-5'></hr>
            <section>
                {
                   courseEntireData?.courseContent?.map((section, index) => (
                        <div key={index}>
                            <div
                            onClick={() => handleNavigateToSection(section)}
                            className={`${sectionId === section?._id ? "bg-amber-400 text-richblack-800" : "bg-richblack-800"} px-3 py-2 cursor-pointer rounded-md`}
                            >
                                {section?.sectionName}
                            </div>
                            {   
                                (section?._id === sectionId) && 
                                (<div>
                                    {section?.subSectionData.map((subSection, index) => (
                                        <div key={index}
                                        className='px-4 bg-richblack-600 py-4 flex gap-x-4 cursor-pointer'
                                        onClick={() => handleClickToNavigate(section, subSection)}>
                                            <input type="checkbox" id="checkbox" checked={handleChecked(subSection?._id)} readOnly/>
                                            <label htmlFor="checkbox" className=' cursor-pointer'>{subSection?.title}</label>
                                        </div>
                                ))  }
                            </div>)}
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default ViewCourseSideBar;
