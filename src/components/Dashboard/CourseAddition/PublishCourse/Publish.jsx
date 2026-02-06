import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from "../../../../utils/stateCourse";
import { resetCourseState, setEditCourse } from '../../../../redux/slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { updateCourse } from '../../../../services/operations/courseDetailsAPI';

const Publish = () => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { 
        register,
        formState: { errors },
        getValues,
        setValue,
        handleSubmit
    } = useForm();

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handlePublish = async () => {
        console.log(course);
        console.log("cliked")
        if
        ((course?.status === COURSE_STATUS.PUBLISHED && getValues("makePublic") === true) 
            || 
        (course?.status === COURSE_STATUS.DRAFT && getValues("makePublic") === false)) 
        {
            goToCourses();
            return;
        }

        const formdata = new FormData();
        formdata.append("courseId", course._id);
        if(getValues("makePublic") === true) {
            formdata.append("status", "Published");
        }
        else {
            formdata.append("status", "Draft");
        }
        
        setLoading(true);
        const result = await updateCourse(token, formdata);
        console.log(result);
        if(result) {
            goToCourses();
        }
        setLoading(false);
    }

    const submitHandler = (data) => {
        handlePublish();
    }

    const goBack = () => {
        setEditCourse(true);
    }

    return (
        <div className='bg-richblack-800 mt-10 py-5 px-3 rounded-md'>
            <div className='flex flex-col gap-y-7'>
                <h2 className='text-[1.8rem] font-bold text-white'>Publish Settings</h2>
                <form 
                onSubmit={handleSubmit(submitHandler)}
                className='flex gap-y-4 flex-col'>
                    <div className='flex gap-x-5 items-center'>
                        <input
                        type="checkbox"
                        {...register("makePublic", {required: true})}
                        id="makePublic"
                        className='text-[1.5rem]'
                        />
                        <label htmlFor='makePublic' className='text-richblack-200 text-[1.2rem]'>Make this course as public</label>
                    </div> 
                    <div className='flex justify-end gap-x-4'>
                        <button
                        onClick={goBack}
                        className='rounded-md py-3 px-4 cursor-pointer bg-richblack-700'
                        >
                            Back
                        </button>
                        <button
                        type="submit"
                        className='rounded-md py-3 px-2 cursor-pointer bg-amber-300 text-richblack-800'
                        >
                            Save Changes
                        </button>
                    </div>             
                </form>
                
            </div>
        </div>
    )
}

export default Publish;
