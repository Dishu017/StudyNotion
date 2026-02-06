import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseDetails } from "../services/operations/courseDetailsAPI"
import RatingStars from '../components/common/RatingStars';
import { IoMdInformationCircle } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { getAverageRatings } from '../services/operations/categoryAPI';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import ConfirmationModal from "../components/common/ConfirmationModal";
import { toast } from 'react-toastify';
import Footer from "../components/core/HomePage/Footer"
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";


const CoursePage = () => {

    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [bodyArray, setBodyArray] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const userDetails = useSelector((state) => state.profile.user);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCourseDetails({courseId})
            setCourseData(response);
        }
        fetchData();
    }, [courseId]);

    useEffect(() => {
            const initialRun = async () => {
                console.log("Id is ", courseId);
                const result = await getAverageRatings({courseId});
                console.log("Result is:", result);
                setAverageRating(result);
            }
            initialRun();
    }, []);

    const modalData = {
            text1: "You are not Logged In",
            text2: "You need to login first to access this course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(false),
        }

    const handleAddToCart = () => {
        if(!token) {
            console.log("here");
            setConfirmationModal(true);
        }
        console.log("Inside cart")
        dispatch(addToCart(courseData));
    }

    const handleBuyCourse = () => {
        if(!userDetails) {
            setConfirmationModal(true);
            toast.error("Please Login first");
        } 
        buyCourse(token, [courseId], userDetails, navigate, dispatch);
    }

    function toggleFunction(index) {
        console.log("Inside toggle fn");
        if(bodyArray.includes(index)) {
            setBodyArray((prev) => prev.filter((ele) => ele !== index));
        }
        else {
            setBodyArray((prev) => ([...prev, index]));
        }
    }

    const clearArray = () => {
        setBodyArray([]);
    }
        
    console.log("Debugging", courseData?.ratingAndReviews, courseData);

    return (
            <div className='w-full mx-auto'>
                <section className='bg-richblack-800 flex px-26 justify-between mx-auto flex-wrap lg:h-[400px]'>
                    <div className='flex flex-col gap-y-5 w-1/2 justify-center px-32 h-full'>
                        <h2 className='text-4xl font-bold'>{courseData?.courseName}</h2>
                        <p className='text-richblack-300'>{courseData?.courseDescription}</p>
                        <div className='gap-y-3 flex flex-col'>
                            <div className='flex flex-row gap-x-3 items-center'>
                                <p className='text-richblack-50 text-[1.3rem]'>{courseData?.ratingAndReviews?.rating || 0}</p>
                                <RatingStars Review_Count={averageRating} />
                                <div className='flex items-center gap-x-2'>
                                (
                                    <span>{courseData?.studentsEnrolled?.length}</span>
                                    <span>Students Enrolled</span>
                                )    
                                </div>
                            </div>
                            <p className='flex gap-x-3 text-richblack-100'>Created by<span>{`${courseData?.instructor?.firstName}`} {`${courseData?.instructor?.lastName}`}</span></p>
                            {/* <div className='flex items-center gap-x-3'>
                                <IoMdInformationCircle />
                                <div>{courseData?.createdAt}</div>
                            </div> */}
                        </div>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <div className='w-4/7 p-4 bg-richblack-700 rounded-md translate-y-1/9 flex flex-col gap-y-3'>
                            <img src={courseData?.thumbnail} className='object-cover h-[280px]'/>
                            <div className='text-2xl font-bold'>Rs. {courseData?.price}</div>
                            <div className='flex flex-col gap-y-3 items-center'>
                                <button
                                className='bg-amber-300 px-3 py-2
                                text-richblack-900 rounded-md w-full cursor-pointer'>
                                {
                                    courseData?.studentsEnrolled.includes(userDetails?._id) ?
                                    (<div
                                    onClick={() => navigate("/dashboard/enrolled-courses")}>
                                        Go to Courses
                                    </div>): 
                                    (<div
                                    onClick={handleBuyCourse}
                                    >
                                        Buy Now
                                    </div>)
                                }
                                </button>
                                {
                                    !courseData?.studentsEnrolled?.includes(userDetails?._id) &&
                                    <button
                                    className='px-3 py-2 text-richblack-50 rounded-md 
                                    w-full bg-richblack-800 cursor-pointer'
                                    onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </button>
                                }
                                
                            </div>
                            <div className="flex justify-center">
                                30 Days Moneyback gurantee
                            </div>
                            <div className='text-amber-400 flex justify-center items-center gap-x-3 cursor-pointer'>
                                <FaShare />
                                <span>Share</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='w-full px-52 mt-10 mb-15'>
                    <div className='w-4/7 border-1 border-richblack-600 flex
                     justify-start items-center py-10 px-10'>
                        <div className='flex text-4xl font-bold justify-center 
                        items-center w-fit'>
                            What you will learn
                        </div>
                    </div>
                     <div className='w-4/7 mt-10'>
                            <div className='text-3xl font-bold'>Course Content</div>
                            <div className='flex justify-between mt-5'>
                                <div>
                                    <span>
                                        {courseData?.courseContent.length} section(s)
                                    </span>
                                    <span>
                                        {courseData?.courseContent?.subSectionData?.length} lecture(s)
                                    </span>
                                </div>
                                <div className='cursor-pointer text-amber-300 underline'
                                onClick={clearArray}
                                >
                                    Collapse All Section
                                </div>
                            </div>
                            <div className='w-full bg-richblack-500 text-richblack-25 mt-10
                            rounded-md px-2 py-2 grid grid-cols-1 gap-y-4 border-1 border-richblack-400'>
                                {
                                    courseData?.courseContent.map((section, index) => (
                                        <div className='w-full cursor-pointer'
                                        onClick={() => toggleFunction(index)}>
                                            <div className=' text-[1.1rem] flex justify-between'>
                                                <div className='flex items-center gap-x-3'>
                                                    <span>{!bodyArray.includes(index) ? (<FaChevronDown />) : (<FaChevronUp />)}</span>
                                                    <span>{section?.sectionName}</span>
                                                </div>
                                                <div>{section?.subSectionData?.length || 0} Lecture(s)</div>
                                            </div> 
                                            {
                                                bodyArray.includes(index) &&
                                                (
                                                    <div className='bg-richblack-800 text-richblack-25 rounded-md'>
                                                        {
                                                            section?.subSectionData.map((ele, index) => (
                                                            <div className='flex justify-between items-center rounded-md px-8 py-2 mt-5'>
                                                                <span>{ele.title}</span>
                                                                <span>{ele.timeDuration}</span>
                                                            </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                </section>

                {confirmationModal && <ConfirmationModal modalData={modalData} />}

                <Footer />
            </div>
       
    )
}

export default CoursePage;
