import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { MdAutoDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { setCourse, setSectionData } from '../../../../redux/slices/courseSlice';
import { getSubSectionData, updateSubSection } from '../../../../services/operations/courseDetailsAPI';
import { deleteSubSection } from "../../../../services/operations/courseDetailsAPI"
import { useEffect } from 'react';

const NestedView = ({
    setOpenModal, setFocus, setEditSectionName, setDeleteModal, setUpdateSectionText,
    setAddLecture, setViewLecture, setEditLecture
}) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const { editCourse } = useSelector((state) => state.course);
    
    const dispatch = useDispatch();

    const editSectionNameNested = (sectionId) => {
        setFocus("sectionName");
        setUpdateSectionText(true);
        setEditSectionName(sectionId);
    }

    const deleteSectionName = (sectionId) => {
        setDeleteModal(sectionId);
    }

    const editSubsection = async (subSectionId) => {
        setOpenModal(true)
        setAddLecture(false)
        const response = await getSubSectionData({subSectionId});
        setEditLecture(response);
    }

    const deleteSubsection = async (subSectionId, sectionId) => {
        const response = await deleteSubSection(token, {
            subSectionId: subSectionId,
            sectionId: sectionId,
            courseId: course._id,
        });
        console.log("response in nestedview", response)
        dispatch(setCourse(response));
    }

    return (
        <div className='pl-10 pt-5'>
            {
                course?.courseContent?.length > 0 && (
                    course?.courseContent.map((section, index) => (
                        <details open className='py-4 px-3'>
                            <summary className='flex justify-between'>
                                <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu />
                                    <div>{section.sectionName}</div>
                                </div>
                                <div className='flex gap-x-3 items-center'>
                                    <button className='cursor-pointer'
                                    onClick={() => editSectionNameNested(section._id)}>
                                        <CiEdit />
                                    </button>
                                    <button className='cursor-pointer'
                                    onClick={() => deleteSectionName(section._id)}>
                                        <MdAutoDelete />
                                    </button>
                                    <div>|</div>
                                    <button className='cursor-pointer'>
                                        <IoMdArrowDropdown />
                                    </button>
                                </div>
                            </summary>
                            <div>
                                {
                                    section?.subSectionData?.length === 0 ? (
                                        <button
                                        className='px-4 py-2 bg-amber-300 text-richblack-800
                                        rounded-md mt-4 cursor-pointer'
                                        onClick={() => setOpenModal(section._id)}>
                                            + Add a lecture
                                        </button>   
                                    ) : (<div>
                                        {section?.subSectionData?.map((subSection, index) => (
                                            <div className='flex flex-col gap-y-4 mt-5'>
                                                <div className='flex justify-between'>
                                                    <div>{subSection.title}</div>
                                                    <div className='flex flex-row gap-x-4'>
                                                        <button
                                                        className='text-[1rem]'
                                                        onClick={() => editSubsection(subSection._id)}>
                                                            <MdEdit />
                                                        </button>
                                                        <button
                                                        className='text-[1rem]'
                                                        onClick={() => deleteSubsection(subSection._id, section._id)}>
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                className='px-4 py-2 bg-amber-300 text-richblack-800
                                                rounded-md mt-4 cursor-pointer'
                                                onClick={() => setOpenModal(section._id)}>
                                                    + Add a lecture
                                                </button>  
                                            </div>
                                        ))}
                                    </div>)
                                }
                            </div>
                        </details>
                    ))
                )
            }
        </div>
    )
}

export default NestedView;
