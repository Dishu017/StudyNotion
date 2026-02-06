import React from 'react'
import { useForm } from 'react-hook-form';
import { changePasswordInApp } from "../../../services/operations/settingsAPI"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePasswordSettings = () => {

    const { register, reset, handleSubmit, formState: { errors, isSubmitSuccessful}} = useForm();
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = (data) => {
        dispatch(changePasswordInApp(token, data, navigate));
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className='bg-richblack-600/45 rounded-md px-9 py-8 
        mt-6 flex flex-col gap-y-4'>
            <div className='font-bold text-[1.4rem]'>
                Password
            </div>
            <div className='flex flex-row gap-x-5'>
                <label className='flex flex-col gap-y-3 w-[45%]'>
                    <p>Current Password</p>
                    <input type="text" {...register("password")} 
                        className='rounded-md bg-richblack-500 px-3 py-3'
                        placeholder='Enter your password'
                    />
                </label>
                <label className='flex flex-col gap-y-3 w-[45%]'>
                    <p>New Password</p>
                    <input type="text" {...register("confirmPassword")} 
                        className='rounded-md bg-richblack-500 px-3 py-3'
                        placeholder='Confirm your password'
                    />
                </label>
            </div>
            <button type="submit" className='px-4 py-2 bg-amber-300 cursor-pointer text-richblack-900 
            rounded-md w-fit justify-self-end'>Change Password</button>
        </form>
    );
}

export default UpdatePasswordSettings;
