import React from 'react'
import { deleteSection } from "../../../../services/operations/courseDetailsAPI"
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../redux/slices/courseSlice';

const DeleteModal = ({setDeleteModal, deleteModal, token, setEditSectionName, setUpdateSectionText}) => {

    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();

    const deleteSectionData = async (deleteModal) => {
        const response = await deleteSection(token, {
            sectionId: deleteModal,
            courseId: course._id,
        });
        setDeleteModal(null);
        dispatch(setCourse(response));
        setEditSectionName(false);
        setUpdateSectionText(false);
    }

    return (
        <div className='fixed backdrop-blur-md z-100 inset-0 flex justify-center items-center'>
            <div className='flex flex-col gap-y-6 justify-center items-center bg-richblack-700/50 py-7 px-4 rounded-md'>
                <h1 className='text-2xl font-bold'>Delete this Section</h1>
                <p className='text-richblack-300'>Please confirm Do you want to continue</p>
                <div className='flex justify-around gap-x-4'>
                    <button 
                    className='bg-amber-300 rounded-md text-richblack-900 px-4 py-2 cursor-pointer'
                    onClick={() => deleteSectionData(deleteModal)}>
                        Delete
                    </button>
                    <button 
                    onClick={() => setDeleteModal(null)}
                    className='bg-richblack-700 rounded-md text-richblack-100 px-4 py-2 cursor-pointer'>
                        Cancel 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
