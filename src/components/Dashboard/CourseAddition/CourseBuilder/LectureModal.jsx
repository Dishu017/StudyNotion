import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCloudUploadAlt } from "react-icons/fa";
import { createSubsection, updateSubSection } from '../../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from "react-icons/md";
import { setCourse, setSectionData } from '../../../../redux/slices/courseSlice';

const LectureModal = ({
    openModal, 
    setOpenModal, 
    addLecture, 
    viewLecture, 
    editLecture, 
    setEditLecture
}) => {

    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    const dispatch = useDispatch();

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const { 
        register, 
        formState: {errors},
        handleSubmit,
        setValue
    } = useForm();

    const uploadRef = useRef(null);

    const handleButton = (e) => {
        e.preventDefault();
        uploadRef.current.click();
    }

    const fileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("File selected:", file.name);
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            //setValue("videoFile", e.target.files);
            register("videoFile").onChange(e)
        }
    }

    useEffect(() => {
        if(editLecture) {
        //setValue("videoFile", editLecture.videoUrl);
        setValue("title", editLecture.title);
        setValue("description", editLecture.description);
        setPreview(editLecture.videoUrl);
    }
    }, [])

    const onsubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("sectionId", openModal);
        formData.append("courseId", course._id)

        if(editLecture) {
            formData.append("subSectionId", editLecture);
        }

        if(selectedFile) {
            formData.append("videoFile", selectedFile);
            console.log("Video file added to FormData:", selectedFile.name);
        } else {
            console.error("No video file selected!");
            alert("Please select a video file");
            return;
        }

        console.log("Data before uploading", formData);

        let response;

        if(addLecture) {
            response = await createSubsection(formData, token);
        }
        else if(editLecture) {
            response = await updateSubSection(token, formData);
        }
        dispatch(setCourse(response));

        setOpenModal(null)
        setEditLecture(false);
    }

    const cancelEditSubsection = () => {
        setOpenModal(false);
        setEditLecture(null);
    }

    const cancelSelect = () => {
        setValue("videoFile", null);
        setPreview(null);
    }

    return (
        <div className='fixed backdrop-blur-md z-[100] top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
            <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-y-6 rounded-md lg:w-[45rem] h-fit py-6 px-3 bg-richblack-600/30'>
                <div className='text-2xl font-bold flex justify-between'>
                    <p>{addLecture && "Add"} {editLecture && "Edit"} {viewLecture && "View"} Lecture</p>
                    <button className='cursor-pointer' onClick={() => setOpenModal(false)}><MdClose /></button>
                </div>
                <div className='w-full rounded-md h-[20rem]'>
                    {
                        !preview ? 
                        (<div className='w-full rounded-md h-full flex flex-col gap-y-3'>
                            <label htmlFor='videoFile'>Add a lecture<span className='text-red-600'>*</span></label>
                            <input
                                id="videoFile"
                                type="file"
                                {...register("videoFile", { required: {
                                    value: true,
                                    message: "Video is a must"
                                }})}
                                className='hidden'
                                onChange={fileHandler}
                                ref={(e) => {
                                    register("videoFile").ref(e);
                                    uploadRef.current = e;
                                    }}
                                accept="video/*"
                            />
                            {
                                errors.videoFile && (<span className='text-red-600'>Please select a video</span>)
                            }
                            <button
                            onClick={handleButton}
                            className='flex flex-col gap-y-2 h-full cursor-pointer w-full bg-richblack-700 justify-center items-center'>
                                <div className='text-amber-300 text-4xl'>
                                    <FaCloudUploadAlt />
                                </div>
                                <p className='text-[1.2rem] font-bold'>Upload</p>
                            </button>
                        </div>) : 
                        (<div className='w-full h-full flex flex-col gap-y-4 mb-7'>
                            <video 
                                src={preview}
                                controls 
                                className='w-full h-[calc(100%-2rem)] cursor-pointer'
                            />
                            <button className="bg-amber-300 px-3 py-2 text-richblack-800 rounded-md w-fit" 
                            onClick={() => cancelSelect()}>Cancel</button>
                        </div>)
                    }
                </div>
                <div className='flex flex-col gap-y-3 mt-5'>
                    <label htmlFor='title'>Lecture Title <span className='text-red-600'>*</span></label>
                    <input 
                        id="title"
                        type="text"
                        {...register("title", { required: true })}
                        placeholder='Enter Lecture Title'
                        className='px-2 py-2'
                    />
                </div>
                <div className='flex flex-col gap-y-3'>
                    <label htmlFor='description'>Lecture Description <span className='text-red-600'>*</span></label>
                    <input
                        id="description"
                        type="text"
                        {...register("description", { required: true })}
                        placeholder='Enter lecture description'
                        className='px-2 py-2'
                    />
                </div>
                {
                    addLecture ? 
                    (<button 
                    type="submit" 
                    className='bg-amber-300 text-richblack-800 px-4 py-3 rounded-md w-fit
                    cursor-pointer'>
                        Save
                    </button>)
                    : editLecture ? 
                    (<div className='flex justify-end gap-x-4'>
                        <button 
                        type="submit"
                        className='bg-amber-300 px-3 py-2 text-richblack-800 rounded-md'>
                            Save Changes
                        </button>
                        <button
                        onClick={() => cancelEditSubsection()}
                        className='bg-richblack-900 px-3 py-2 text-richblack-300 rounded-md'>
                            Cancel
                        </button>
                    </div>)
                    : viewLecture && 
                    <div></div>
                }
            </form>
        </div>
    )
}

export default LectureModal;
