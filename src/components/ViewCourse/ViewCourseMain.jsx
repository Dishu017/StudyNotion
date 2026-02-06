import React, { useEffect, useState } from 'react'
import { getCompleteCourseDetails } from '../../services/operations/courseDetailsAPI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseEntireData, setCourseSectionData, setTotalNoOfLectures, setCompletedLectures } from '../../redux/slices/viewCourseSlice';
import ViewCourseSideBar from './ViewCourseSideBar';
import RatingsModal from './RatingsModal';
import ReactPlayer from 'react-player'
import { markAsComplete } from '../../services/operations/getCourses';
import { FaPlay } from "react-icons/fa";
import { toast } from 'react-toastify';
import { fetchCompletedSubSection } from "../../services/operations/getCourses";

const ViewCourseMain = () => {

    const { token } = useSelector((state) => state.auth);
    const [videoData, setVideoData] = useState(null);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [markComplete, setMarkComplete] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);

    // const [isActive, setIsActive] = useState(courseSectionData[0]?.sectionName);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { courseId, sectionId, subSectionId } = useParams();
    const { courseEntireData, courseSectionData, completedLectures } = useSelector((state) => state.viewCourse); 

    const [review, setReview] = useState(false); 

    console.log("CourseSectiondata", courseSectionData);

    function isFirstVideo() {
        const currentSectionIndex = courseSectionData?.findIndex(
            (section) => section?._id === sectionId
        );
        console.log("currentSectionIndex", currentSectionIndex);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]
                                        ?.subSectionData?.findIndex(
                                            (subSection) => subSection === subSectionId
                                        );
        console.log("currentSubSectionIndex", currentSubSectionIndex);
        if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        return false;
    }

    function isLastVideo() {
        const currentSectionIndex = courseSectionData?.findIndex(
                                        (section) => section?._id === sectionId
                                    );
        console.log("SectionIndex", currentSectionIndex);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]
                                        ?.subSectionData
                                        ?.findIndex(
                                            (subSection) => subSection?._id === subSectionId
                                        );
        console.log("SubSectionIndex", currentSubSectionIndex); 

        const subSectionLength = courseSectionData[currentSectionIndex]?.subSectionData.length;

        if((currentSectionIndex === courseSectionData.length - 1) && (currentSubSectionIndex === subSectionLength - 1)) {
            return true;
        }          
        return false;                    
    }

    const goToPrevious = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
                                        (section) => section?._id === sectionId
                                    );
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]
                                        ?.subSectionData
                                        ?.findIndex(
                                            (subSection) => subSection?._id === subSectionId
                                        );

        const subSectionLength = courseSectionData[currentSectionIndex - 1]?.subSectionData.length;

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            toast.info("Already on first video")
            return;
        }                                
        if(currentSubSectionIndex === 0) {
            navigate(`/view-course/${courseEntireData?._id}/section/${courseSectionData[currentSectionIndex - 1]?._id}/sub-section/${courseSectionData[currentSectionIndex - 1]?.subSectionData[subSectionLength - 1]?._id}`);     
            return;                  
        }   
        navigate(`/view-course/${courseEntireData?._id}/section/${courseSectionData[currentSectionIndex]?._id}/sub-section/${courseSectionData[currentSectionIndex]?.subSectionData[currentSubSectionIndex - 1]?._id}`);                       
        return;                           
    }

    const goToNext = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
                                        (section) => section?._id === sectionId
                                    );
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]
                                        ?.subSectionData
                                        ?.findIndex(
                                            (subSection) => subSection?._id === subSectionId
                                        );

        const subSectionLength = courseSectionData[currentSectionIndex]?.subSectionData.length;

        if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === subSectionLength - 1) {
            toast.info("Already on last video")
            return;
        }    
        if(currentSubSectionIndex === subSectionLength - 1) {
            navigate(`/view-course/${courseEntireData?._id}/section/${courseSectionData[currentSectionIndex + 1]?._id}/sub-section/${courseSectionData[currentSectionIndex + 1]?.subSectionData[0]?._id}`);     
            return;                  
        }
        navigate(`/view-course/${courseEntireData?._id}/section/${courseSectionData[currentSectionIndex]?._id}/sub-section/${courseSectionData[currentSectionIndex]?.subSectionData[currentSubSectionIndex + 1]?._id}`);                       
        return;      
    };

    const settingVideoToPlay = () => {
        const findSectionIndex = courseSectionData?.findIndex(
            (section) => section?._id === sectionId
        );
        if(findSectionIndex < 0) return;

        const findCurrentSubSectionIndex = courseSectionData[findSectionIndex]?.
                                        subSectionData?.findIndex(
                                            (subSection) => subSection?._id === subSectionId
                                        );
        if(findCurrentSubSectionIndex < 0) return;

        // console.log("URL:", courseSectionData[findSectionIndex]?.subSectionData[findCurrentSubSectionIndex]?.videoUrl);
        setVideoData(courseSectionData[findSectionIndex]?.subSectionData[findCurrentSubSectionIndex]?.videoUrl);
    }

    const handleEnded = () => {
        if(!completedLectures?.includes(subSectionId)) {
            setMarkComplete(true);
        }
        setVideoEnded(true);
        console.log("Video Ended Playing");
        setShowPlayButton(true);
    };

    const handlePlay = () => {
        setVideoEnded(false);
    }

    const handlePause = () => {
        console.log("Video Paused");
        setShowPlayButton(true);
    }

    const handleMarkComplete = async () => {
        await markAsComplete({courseId, sectionId, subSectionId}, dispatch, token); 
        setMarkComplete(false);   
    }

    useEffect(() => {
        const initialRun = async () => {
            const response = await getCompleteCourseDetails(token, { courseId });
           
            dispatch(setCourseEntireData(response));
            dispatch(setCourseSectionData(response?.courseContent));

            let count = 0;
            response?.courseContent.forEach((section) => {
                count += section?.subSectionData?.length;
            })
            dispatch(setTotalNoOfLectures(count))
        };
        initialRun();
    }, [courseId, token]);

    useEffect(() => {
        if(!courseEntireData) {
            return;
        }
        if(sectionId && subSectionId) {
            if(location.pathname.includes(sectionId) && location.pathname.includes(subSectionId)) {
                return;
            }
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`);
            return;
        }

        const firstSectionId = courseEntireData?.courseContent[0]?._id;
        const firstSubSectionId = courseEntireData?.courseContent[0]?.subSectionData[0]?._id;

        if(!firstSectionId || !firstSubSectionId) {
            return;
        }

        navigate(`/view-course/${courseId}/section/${firstSectionId}/sub-section/${firstSubSectionId}`);

    }, [courseEntireData, sectionId, subSectionId, courseId]);

    useEffect(() => {
        if(!courseSectionData) {
            return;
        }
        settingVideoToPlay();
    }, [courseSectionData, sectionId, subSectionId]);

    useEffect(() => {
        const fetchedCompLecturesData = async () => {
            const data = await fetchCompletedSubSection(token, {courseId: courseId});
            if(!data) {
                return;
            }
            console.log("Data compLectures", data?.completedVideos);

            dispatch(setCompletedLectures(data?.completedVideos));
        }
        fetchedCompLecturesData();
    }, [courseId, sectionId, subSectionId]);

    return (
        <div className='flex flex-row w-screen h-[calc(100vh-3.5rem)]'>
            <div className='w-fit'>
                <ViewCourseSideBar 
                    setReview={setReview} 
                    // setIsActive={setIsActive} 
                    // isActive={isActive}
                />
            </div>
            <div className='flex items-center justify-center mx-auto relative'>
                <ReactPlayer 
                    controls={true}
                    src={videoData}
                    playing={!showPlayButton}
                    // loop={true}
                    muted
                    width={"900px"}
                    height={"600px"}
                    onEnded={handleEnded}
                    onPause={handlePause}
                    onPlay={handlePlay}
                />
                {showPlayButton &&  
                (<div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]
                bg-richblack-700 rounded-md py-5 px-8 cursor-pointer'
                onClick={() => setShowPlayButton((prev) => !prev)}>
                    <FaPlay size={30}/>
                </div>)}
                {
                    markComplete && 
                    (
                        <div className='fixed inset-0 bg-richblack-800/45 backdrop-blur-sm flex items-center justify-center z-1000'>
                            <div className='w-[400px] h-[200px] flex flex-col justify-center gap-y-5 bg-richblack-700 rounded-md'>
                                <p className='text-center text-2xl'>Mark Video As Completed ?</p>
                                <div className='flex gap-x-5 justify-center items-center'>
                                    <button onClick={handleMarkComplete}
                                    className='text-richblack-800 bg-amber-300 px-3 py-3 rounded-md cursor-pointer'>Yes Mark!</button>
                                    <button onClick={() => setMarkComplete(false)}
                                    className='bg-richblack-800 px-3 py-3 rounded-md cursor-pointer'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    videoEnded && 
                    (<div className='absolute top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-transparent flex gap-x-4'>
                        <button onClick={goToPrevious}
                        className='bg-amber-300 text-richblack-800 px-3 py-2 cursor-pointer rounded-md'>
                            Prev
                        </button>
                        <button onClick={goToNext}
                        className='bg-richblack-700 text-richblack-100 px-3 py-2 cursor-pointer rounded-md'>
                            Next
                        </button>
                    </div>)
                }
            </div>
            {review && <RatingsModal setReview={setReview} courseId={courseId}/>}
        </div>
    )
}

export default ViewCourseMain;
