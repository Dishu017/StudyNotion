import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPIConnect';

const ResetPassword = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const token = location.pathname.split("/").at(-1);
    const { loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    })

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    };

    const { newPassword, confirmPassword } = formData;
    console.log("Check check ->", newPassword, confirmPassword);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(newPassword, confirmPassword, token));
    }

    return (
        <div className='w-screen min-h-[calc(100vh-4rem)] bg-richblack-900 text-richblack-5 flex 
        justify-center items-center'>
            {
                loading ?
                (<div className='spinner'></div>) : 
                (<div className='lg:w-[30rem] flex flex-col gap-y-4'>
                    <h1 className='text-center text-[3rem]'>Choose new password</h1>
                    <p className='text-richblack-600 text-center'>
                        Almost done! Enter your new password and you are all set.
                        To embark on a new journey with us.
                    </p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
                        <label className='flex flex-col gap-2'>
                            <p>New password<span className='text-red-800'>*</span></p>
                            <input
                                type="text"
                                value={FormData.newPassword}
                                name="newPassword"
                                onChange={changeHandler}
                                className='bg-richblack-600 px-4 py-3 text-richblack-5 rounded-md w-full'
                                placeholder='Enter your new password!'
                            />
                        </label>
                        <label className='flex flex-col gap-2'>
                            <p>Confirm password<span className='text-red-800'>*</span></p>
                            <input
                                type="text"
                                value={FormData.confirmPassword}
                                name="confirmPassword"
                                onChange={changeHandler}
                                className='bg-richblack-600 px-4 py-3 text-richblack-5 rounded-md w-full'
                                placeholder='Confirm your new Password!'
                            />
                            <button type="submit" className='w-full bg-yellow-100 rounded-md text-richblack-900
                            px-4 py-3 mt-4 cursor-pointer'>Reset Password</button>
                        </label>
                    </form>
                    <Link to={"/login"}>
                        <p className='text-center'>Back to Login</p>
                    </Link>
                </div>)
            }
        </div>
    )
}

export default ResetPassword;
