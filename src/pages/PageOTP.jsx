import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPIConnect';
import { Link } from 'react-router-dom';

const PageOTP = () => {

    const [otp, setOtp] = useState("");

    //const { email } = useSelector((state) => state.auth.signUpData);
    const { signUpData } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
      e.preventDefault();
      dispatch(signUp(signUpData, otp, navigate));
    }

    return (
      <div className='w-screen min-h-screen flex bg-richblack-900 text-richblack-25 justify-center items-center'>
          <form className='lg:w-[500px] lg:h-[400px]' onSubmit={handleOnSubmit}>
              <h1 className='text-[3rem] text-center'>Verify Your Email</h1>
              <p className='text-center text-richblack-600'>A verification code has been sent to you! Please enter it here below.</p>
              <div className='flex justify-center'>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    shouldAutoFocus
                    inputStyle={{
                        width: '3rem',
                        height: '4rem',
                        margin: '1rem 0.5rem',
                        fontSize: '2rem',
                        borderRadius: 1,
                        border: '1px solid blue',
                    }}
                    renderInput={(props) => <input {...props}/>}
                  />
              </div>
              <button type="submit" className='bg-yellow-100 rounded-md py-3 px-4 w-full mt-4 text-richblack-900 cursor-pointer'>Verify Email</button>
              <div className='flex flex-row justify-between mt-6'>
                <Link to={"/login"} className='cursor-pointer text-[1.1rem]'>Back to Login</Link>
                <button className='cursor-pointer text-[1.1rem]' onClick={() => dispatch(sendOtp(email, navigate))}>Resend It</button>
              </div>
          </form>
      </div>
    )
}

export default PageOTP;
