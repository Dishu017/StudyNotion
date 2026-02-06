import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getCategory } from "../../../../services/operations/categoryAPI"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, updateCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setStep } from '../../../../redux/slices/courseSlice';
import RequirementSection from './RequirementSection';
import TagSelection from "./TagSelection"

const CourseInformation = () => {

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);

    const { course, editCourse } = useSelector((state) => state.course);
    console.log("course", course);
    const chooseRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        getValues
    } = useForm();

    const handleThumbnail = (e) => {
        const imageFile = e.target.files[0];
        if(imageFile) {
            setThumbnail(imageFile);
            setPreview(URL.createObjectURL(imageFile));
        }
    }

    const fetchCategoryData = async () => {
        const categories = await getCategory();
        setCategoryData(categories);
    }

    useEffect(() => {
        fetchCategoryData();
    }, [editCourse, course]);

    useEffect(() => {
        if(editCourse) {
            setValue("courseName", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("price", course.price);
            setValue("category", course.category);
            setValue("whatYouWillLearn", course.whatYouWillLearn);
            //setValue("instructions", JSON.parse(course.instructions));
            //setValue("tags", JSON.parse(course.tags));
            setValue("thumbnail", course.thumbnail);
        }
    }, [editCourse, course]);

    const submitForm = async (data) => {

        if(!editCourse) {

            const formdata = new FormData();

            formdata.append("thumbnail", thumbnail);
            formdata.append("courseName", data.courseName);
            formdata.append("courseDescription", data.courseDescription);
            formdata.append("price", data.price);
            formdata.append("category", data.category);
            formdata.append("whatYouWillLearn", data.whatYouWillLearn);
            formdata.append("instructions", JSON.stringify(data.instructions));
            formdata.append("tags", JSON.stringify(data.tags));

            const result = await createCourse(token, formdata);

            if(result?.success) {
                dispatch(setStep(2));
                if(result?.data) {
                    dispatch(setCourse(result.data));
                }  
            }
        }

        console.log("Here")

        if(editCourse && course) {
            //console.log("Here2")
            console.log(isFormUpdated());
            if(isFormUpdated()) {
                console.log("Inside");

                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id)

                if(currentValues.courseName !== course.courseName) {
                    formData.append("courseName", data.courseName)
                }

                if(currentValues.courseDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseDescription)
                }

                if(currentValues.price !== course.price) {
                    formData.append("price", data.price)
                }

                if(currentValues.category !== course.category) {
                    formData.append("category", data.category)
                }

                if(currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.whatYouWillLearn)
                }

                if(currentValues.instructions.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.instructions))
                }

                if(currentValues.tags.toString() !== course.tags.toString()) {
                    formData.append("tags", JSON.stringify(data.tags))
                }

                const result = await updateCourse(token, formData);

                if(result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result))
                }
            }
        }
    }

    const fileUploadButton = (e) => {
        e.preventDefault()
        chooseRef.current.click();
    }

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseName !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.price !== course.price ||
            currentValues.category !== course.category ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.instructions.toString() !== course.instructions.toString() ||
            currentValues.tags.toString() !== course.tags.toString() ||
            currentValues.thumbnail !== course.thumbnail
        ) {
            return true;
        }    
        else {
            return false;
        }    
    }

    return (
        <div className='flex flex-col gap-y-4 bg-richblack-800 rounded-md py-6 px-4 mt-10'>
            <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-y-5'>
                <div className='flex flex-col gap-y-4'>
                    <label htmlFor='courseName'>Course Title<sup className='text-red-800'>*</sup></label>
                        <input
                        type="text"
                        {...register("courseName", 
                        {
                            required: {
                                value: true,
                                message: "Please give your course a name"
                            }
                        })}
                        id="courseName"
                        className='bg-richblack-600 rounded-md p-2'
                    />
                </div>
                <div className='flex flex-col gap-y-4'>
                    <label htmlFor='courseDescription'>Enter Short Description <sup className='text-red-800'>*</sup></label>
                    <input
                        type="text"
                        {...register("courseDescription",
                        {
                            required: {
                                value: true,
                                message: "Enter something about the course"
                            }
                        })}
                        id="courseDescription"
                        className='bg-richblack-600 rounded-md p-2'
                    />
                </div>
                <div className='flex flex-col gap-y-4'>
                    <label htmlFor='price'>Course Price <sup className='text-red-800'>*</sup></label>
                    <input
                        type="text"
                        {...register("price",
                        {
                            required: {
                                value: true,
                                message: "Please enter some value in it be it 0"
                            }
                        })}
                        id="price"
                        className='bg-richblack-600 rounded-md p-2'
                    />
                </div>
                <div className='flex flex-col gap-y-4'>
                    <label htmlFor='category'>Choose a category<sup className='text-red-800'>*</sup></label>
                    <select 
                        {...register("category")}
                        id="category"
                        className='bg-richblack-600 rounded-md p-2'
                    >
                        <option value="">Choose a category</option>
                        {
                            categoryData?.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <label htmlFor='whatYouWillLearn'>Write something about your course!<sup className='text-red-800'>*</sup></label>
                    <textarea
                        id="whatYouWillLearn"
                        {...register("whatYouWillLearn")}
                        placeholder='Write something about your course here!'
                        className='bg-richblack-600 rounded-md h-32 p-2'
                    >
                    </textarea>
                </div>
                <TagSelection
                    name={"tags"}
                    register={register}
                    setValue={setValue}
                />
                <div className='lg:w-full lg:h-90 bg-richblack-600 rounded-md p-2 flex items-center justify-center'>
                    {
                        !preview && (
                           <>
                                <button className='bg-amber-300 w-fit px-3 py-2 rounded-md text-richblack-800 cursor-pointer' 
                                onClick={fileUploadButton}>Choose a file</button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnail}
                                    className='bg-richblack-600 rounded-md hidden'
                                    ref={chooseRef}
                                    //placeholder='Choose a file'
                                />
                           </>
                        )
                    }
                    {
                        preview && (
                        <img
                            src={preview}
                            alt="previewImage"
                            className='object-cover w-[calc(100%-1rem)] h-[calc(100%-2rem)] grid place-content-center'
                        />
                        )
                    }
                </div>
                <RequirementSection
                    name={"instructions"}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                />
                <button type="submit" 
                className='bg-amber-300 px-4 py-3 rounded-md text-richblack-800 justify-end 
                cursor-pointer'>
                    {
                        editCourse ? "Edit" : "Next"
                    }
                </button>
            </form>
        </div>
    )
}

export default CourseInformation;
