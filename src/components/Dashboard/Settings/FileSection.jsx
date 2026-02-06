import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPersonalData } from "../../../services/operations/settingsAPI"
import { useNavigate } from 'react-router-dom';


const FileSection = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const {
      register,
      reset,
      handleSubmit,
      formState: {errors, isSubmitSuccessful}
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = (data) => {
        console.log(data);
        dispatch(uploadPersonalData(token, data, navigate));
    }

    return (
            <section className='bg-richblack-600/45 rounded-md px-9 py-8 flex gap-y-7 mt-6 flex-col'>
                <p className='font-bold text-[1.5rem]'>Profile Information</p>
                <form onSubmit={handleSubmit(submitForm)} className='grid grid-cols-2 gap-x-5 gap-y-3 grid-rows-3'>
                    <label className='flex flex-col gap-x-2'>
                        <p>First Name</p>
                        <input
                            type="text"
                            {...register("firstName")}
                            defaultValue={user?.firstName}
                            className="bg-richblack-600 rounded-md px-4 py-2 w-8/12"
                            placeholder='Enter your first name'
                        />
                    </label>
                    <label className='flex flex-col gap-x-2'>
                        <p>Last Name</p>
                        <input
                            type="text"
                            {...register("lastName")}
                            defaultValue={user?.lastName}
                            className="bg-richblack-600 rounded-md px-4 py-2 w-8/12"
                            placeholder='Enter your last name'
                        />
                    </label>
                    <label className='flex flex-col gap-x-2'>
                        <p>Date of Birth</p>
                        <input
                            type="text"
                            {...register("dateOfBirth")}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                            className="bg-richblack-600 rounded-md px-4 py-2 w-8/12"
                            placeholder='Enter your Date of birth like 23-01-1999'
                        />
                    </label>
                    <label className='flex flex-col gap-x-2'>
                        <p>Gender</p>
                        <input
                            type="text"
                            {...register("gender")}
                            defaultValue={user?.additionalDetails?.gender}
                            className="bg-richblack-600 rounded-md px-4 py-2 w-8/12"
                            placeholder='Enter your gender'
                        />
                    </label>
                    <label className='flex flex-col gap-x-2'>
                        <p>Contact Number</p>
                        <input
                            type="text"
                            {...register("contactNumber")}
                            placeholder='Enter your number'
                            defaultValue={user?.additionalDetails?.contactNumber}
                            className="bg-richblack-600 rounded-md px-4 py-2 w-8/12"
                        />
                    </label>
                    <label className='flex flex-col gap-x-2'>
                        <p>About</p>
                        <input
                            type="text"
                            {...register("about")}
                            defaultValue={user?.additionalDetails?.about}
                            className="bg-richblack-600 rounded-md px-4 py-2 w-8/12"
                            placeholder='Write about yourself'
                        />
                    </label>
                   <div className='col-start-2 flex justify-end pr-25 mt-7'>
                        <button type="submit" className='bg-amber-300 rounded-md text-richblack-900 
                            px-4 py-2 max-w-fit cursor-pointer'>
                                Save
                        </button> 
                   </div>  
                </form>
            </section>
    )
}

export default FileSection;
