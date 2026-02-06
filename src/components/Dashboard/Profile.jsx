import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='w-9/12 mx-auto flex flex-col gap-y-6 mb-10'>
            <h1 className='text-2xl mt-10 font-bold'>My Profile</h1>
            <div className='flex bg-richblack-500/25 justify-between items-center mt-6 rounded-md py-5 px-3'>
                <div className='flex flex-row gap-x-7 px-10 items-center'> 
                    <img src={user?.image} className='w-[78px] h-[78px] rounded-full'/>
                    <div>
                        <h3 className='font-bold'>{user?.firstName + " " + user?.lastName}</h3>
                        <p className='text-richblack-600'>{user?.email}</p>
                    </div>
                </div>
                <button className='bg-amber-300 text-richblack-900 px-5 rounded-md w-fit h-fit py-2 flex gap-x-3 
                items-center mr-6 cursor-pointer' onClick={() => navigate("settings")}>
                    <p className='font-bold'>Edit</p>
                    <FaRegEdit className='font-bold'/>
                </button>
            </div>

            <div className='bg-richblack-500/25 flex rounded-md lg:h-[130px] justify-between px-3 items-center'>
                <div className='flex flex-col gap-y-7 pl-12'>
                    <p className='font-bold'>About</p>
                    <p className='text-richblack-600'>
                        {user?.additionalDetails.about ? 
                        (user?.additionalDetails.about):
                        ("Write something about yourself -->")}
                    </p>
                </div>
                <button className='bg-amber-300 text-richblack-900 px-5 rounded-md w-fit h-fit py-2 flex gap-x-3 
                items-center mr-6 cursor-pointer' onClick={() => navigate("settings")}>
                    <p className='font-bold'>Edit</p>
                    <FaRegEdit className='font-bold'/>
                </button>
            </div>

            <div className='bg-richblack-500/25 flex flex-col gap-y-8 rounded-md p-7'>
                <div className='flex flex-row justify-between'>
                    <p className='font-bold px-8'>Personal details</p>
                    <button className='bg-amber-300 text-richblack-900 px-5 rounded-md w-fit h-fit py-2 flex gap-x-3 
                    items-center mr-2 cursor-pointer' onClick={() => navigate("settings")}>
                        <p className='font-bold'>Edit</p>
                        <FaRegEdit className='font-bold'/>
                    </button>
                </div>
                
                <div className='grid grid-cols-2 grid-rows-3 lg:w-[800px] gap-x-20 gap-y-5 translate-x-1/12 mb-7'>
                        <div>
                            <div className='text-richblack-600'>First name</div>
                            <p>{user?.firstName}</p>
                        </div>
                        <div>
                            <div className='text-richblack-600'>Last name</div>
                            <p>{user?.lastName}</p>
                        </div>
                        <div>
                            <div className='text-richblack-600'>Email</div>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <div className='text-richblack-600'>Phone</div>
                            <p>{user?.additionalDetails?.contactNumber}</p>
                        </div>
                        <div>
                            <div className='text-richblack-600'>Gender</div>
                            <p>{user?.additionalDetails?.gender ? user?.additionalDetails?.gender: "Add Gender"}</p>
                        </div>
                        <div>
                            <div className='text-richblack-600'>Date of birth</div>
                            <p>
                                {
                                    user?.additionalDetails.dateOfBirth ?
                                    user?.additionalDetails.dateOfBirth:
                                    "Add Date of birth"
                                }
                            </p>
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default Profile;
