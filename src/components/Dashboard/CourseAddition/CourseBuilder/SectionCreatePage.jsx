import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../redux/slices/courseSlice';
import NestedView from './NestedView';
import { createSection, updateSection } from '../../../../services/operations/courseDetailsAPI';
import LectureModal from './LectureModal';
import DeleteModal from './DeleteModal';
import { toast } from 'react-toastify';

const SectionCreatePage = () => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const { editCourse } = useSelector((state) => state.course);

    const [openModal, setOpenModal] = useState(null);
    const [editSectionName, setEditSectionName] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const [updateSectionText, setUpdateSectionText] = useState(false);

    const [addLecture, setAddLecture] = useState(true);
    const [viewLecture, setViewLecture] = useState(null);
    const [editLecture, setEditLecture] = useState(null);
 
    const dispatch = useDispatch();

    const {
        setValue,
        getValues,
        register,
        formState: {errors},
        handleSubmit,
        setFocus,
        clearErrors
    } = useForm();

    const currentValue = getValues();

    const onSubmit = async (data) => {
        let response = null;
        if(editSectionName) {
            response = await updateSection(token,
                        {
                            sectionName: data?.sectionName,
                            sectionId: editSectionName,
                            courseId: course._id,
                        },);
        }
       else {
            response = await createSection(
                            {
                                sectionName: data?.sectionName,
                                courseId: course?._id,
                            }, 
                            token);
        }
        if(response) {
            dispatch(setCourse(response))
        }
        setUpdateSectionText(false);
        setValue("sectionName", "");
        setEditSectionName(null);
    }

    const cancelEdit = () => {
        setUpdateSectionText(false);
        setValue("sectionName", " ");
        setEditSectionName(null);
        //document.activeElement.blur(); // removes focus
        clearErrors("sectionName");
    }

    const moveBack = () => {
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    }

    // useEffect(() => {
    //     if(editCourse) {
    //         setValue("sectionName", course?.courseContent?.sectionName); 
    //     }
    // }, [editCourse])

    const moveforward = () => {
        if(course?.courseContent?.length === 0) {
            toast.error("Please add a section first!")
        }
        course?.courseContent.forEach((section) => {
            if(section?.subSection?.length === 0) {
                toast.error("Please add a sub-section first!")
            }
        })
        dispatch(setStep(3));
    }

    return (
        <div className='mt-10 bg-richblack-800 rounded-md px-5 py-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-y-4'>
                    <label htmlFor='sectionName' className='text-white text-2xl font-bold'>Section Name <sup className='text-red-800'>*</sup></label>
                    <input
                        id="sectionName"
                        className='bg-richblack-700 py-3 px-3 rounded-md'
                        {...register("sectionName", {required: true})}
                        placeholder='Enter section name'
                    />
                    {
                        errors.sectionName && (
                            <span className='text-red-800'>Section name is mandatory</span>
                        )
                    }
                </div>
                <div className='flex gap-x-5 items-baseline'>
                    <button 
                    type="submit" 
                    className='bg-amber-300 rounded-md w-fit px-3 py-2 text-richblack-900 mt-7
                    cursor-pointer'>
                        {
                            updateSectionText ? "Update Section" : "Add Section"
                        }
                    </button>
                    {
                        editSectionName && (<button className='text-richblack-700 cursor-pointer'
                        onClick={cancelEdit}>
                            Cancel Edit
                        </button>)
                    }
                </div>
            </form>

            <NestedView setOpenModal={setOpenModal} 
                        setFocus={setFocus} 
                        setEditSectionName={setEditSectionName} 
                        setDeleteModal={setDeleteModal}
                        setUpdateSectionText={setUpdateSectionText}  
                        setAddLecture={setAddLecture}
                        setEditLecture={setEditLecture}
                        setViewLecture={setViewLecture}
            />
            {
                openModal && <LectureModal setOpenModal={setOpenModal} openModal={openModal} 
                                            addLecture={addLecture} viewLecture={viewLecture}
                                            editLecture={editLecture} setEditLecture={setEditLecture}
                />
            }
            {
                deleteModal && <DeleteModal setDeleteModal={setDeleteModal} 
                                            deleteModal={deleteModal}
                                            token={token} 
                                            setEditSectionName={setEditSectionName}
                                            setUpdateSectionText={setUpdateSectionText} 
                                            />
            }
            <div className='flex justify-end gap-x-4'>
                <button 
                className='px-4 py-2 cursor-pointer bg-amber-300 rounded md text-richblack-900'
                onClick={() => moveBack()}>
                    Back
                </button>
                <button 
                onClick={moveforward}
                className='px-4 py-2 cursor-pointer rounded-md bg-richblack-700 text-richblack-100'>
                    Move Further
                </button>
            </div>
        </div>
    )
}

export default SectionCreatePage;
