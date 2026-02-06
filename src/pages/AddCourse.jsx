import { useSelector } from 'react-redux'
import { setStep } from '../redux/slices/courseSlice';
import { useDispatch } from 'react-redux';
import CourseInformation from '../components/Dashboard/CourseAddition/AddCourseInfo/CourseInformation';
import SubSectionAddition from '../components/Dashboard/CourseAddition/CourseBuilder/SectionCreatePage'
import SectionCreatePage from '../components/Dashboard/CourseAddition/CourseBuilder/SectionCreatePage';
import Publish from '../components/Dashboard/CourseAddition/PublishCourse/Publish';

const AddCourse = () => {

    const { step } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    
    const steps = [
        {
            id: 1,
            details: "Course information page"
        },
        {
            id: 2,
            details: "course builder page"
        },
        {
            id: 3,
            details: "publisher page"
        },
    ];


    return (
        <div className='w-9/12 mx-auto py-10 flex gap-x-5'>
            <div className='w-[60%]'>
                <h1 className='text-[2rem]'>Add Course</h1>
                <div className='flex justify-around mt-6'>
                   {
                        steps.map((item, index) => (
                            <p key={index} className={`rounded-full grid place-content-center border-[1px]
                            w-[50px] h-[50px] cursor-pointer ${item.id === step ? 
                            "bg-yellow-900 text-amber-200  border-amber-200" : 
                            "bg-richblack-700 text-white border-richblack-400"}`}
                            onClick={() => dispatch(setStep(item.id))}>{item.id}</p>
                        ))
                   }
                </div>

                {(step === 1) && (<CourseInformation/>)}
                {(step === 2) && (<SectionCreatePage/>) }
                {(step === 3) && (<Publish/>)}
                
            </div>
            <div className='w-[35%] bg-richblack-700 backdrop-blur-md rounded-md p-5 h-fit flex flex-col gap-y-4 text-[0.8rem]'>
                <h2 className='text-[1.2rem]'>Course Upload tips</h2>
                <ul>
                    <li>* Set the course price option or make it free!</li>
                    <li>* Standard size of course thumbnail size is 1024 * 576</li>
                    <li>* Video section controls the course overview video</li>
                    <li>* Course builder is where you build and organise a course</li>
                    <li>* Add question in Course builder section to create lesson,quiz and assignments</li>
                    <li>* Information from the additional data section shows up on the course single page</li>
                    <li>* Make announcements to notify any important information</li>
                    <li>* Notes to all enrolled students at once!</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse;
