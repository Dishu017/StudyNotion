import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetPasswordByToken } from "../services/operations/authAPIConnect"
import { useState } from 'react'

const ResetPasswordToken = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const { loading } = useSelector((state) => state.profile);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        //console.log(email);
        dispatch(resetPasswordByToken(email, setEmailSent));
    }

    const changeHandler = (e) => {
        setEmail(e.target.value);
    }

    const resendHandler = (e) => {
        dispatch(resetPasswordByToken(email, setEmailSent));
    }
 
    return (
        <div className='w-screen min-h-[calc(100vh-4rem)] bg-richblack-900 text-richblack-5 flex justify-center items-center'>
        {
            emailSent ?
            (loading ? 
            (<div className='spinner w-full h-full'></div>) : 
            (<div className='flex flex-col items-center justify-center w-[500px] gap-y-5'>
                <h1 className='text-[2rem] text-center'>Check Email!</h1>
                <p className='text-richblack-600 text-center'>We have sent the reset password email to your email address {email}</p>
                <button className='w-full rounded-md cursor-pointer bg-yellow-100 text-richblack-900 py-3 px-4' onClick={resendHandler}>Resend Email</button>
                <Link to={"/login"}>
                    <p className=''>Back to Login</p>
                </Link>
            </div>)) :
            (loading ? 
            (<div className='spinner w-full h-full'></div>) :
            (<div className='flex flex-col items-center justify-center w-[500px] gap-y-5'>
                <h1 className='text-[2rem] text-center'>Reset Your Password</h1>
                <p className='text-richblack-600 text-center'>
                    Have no fear. We will email you the instructions to reset your password, 
                    if you don't have access to your email we can start account recovery.
                </p>
                <form onSubmit={handleOnSubmit} className='flex flex-col w-full items-stretch gap-y-3'>
                    <label>Email Address<span className='text-red-800'>*</span></label>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        placeholder='Enter your email here!'
                        className='bg-richblack-700 py-3 px-4 rounded-md'
                        onChange={changeHandler}
                    />
                    <button type='submit' className='rounded-md cursor-pointer bg-yellow-100 text-richblack-900 py-3 px-4'>Reset Password</button>
                </form>
                <Link to={"/login"}>
                    <p>Back to Login</p>
                </Link>
            </div>)) 
        }  
        </div>
    );
}

export default ResetPasswordToken;
