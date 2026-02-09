import React, { useState } from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import { Link, useNavigate } from "react-router-dom"
import LoginImage from "../assets/Images/login.webp"
import Frame from "../assets/Images/frame.png"
import { RiEyeOffFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../services/operations/authAPIConnect"

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        accountType: ""
    });

    const { loading } = useSelector((state) => state.profile);

    const [accountType, setAccountType] = useState("student");
    const [showPassword, setShowPassword] = useState(false);

    const buttonHandler = (e) => {
        e.preventDefault();
        setAccountType(e.target.value);
    }

    const changeHandler = (e) => {
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
            accountType
        }));
    }

    const { email, password } = formData;
 
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        loading ?
        (<div className='spinner'></div>): 
        (<div className='w-screen min-h-screen bg-richblack-900 text-richblack-25'>
            <div className='w-10/12 mx-auto flex flex-row pt-20 gap-12 justify-around'>
                {/* Login Form Section */}
                <form className='w-[35%] flex flex-col justify-around gap-4' onSubmit={handleOnSubmit}>
                    <h1 
                        className='text-[2.3rem] font-bold'>
                        Welcome Back
                    </h1>
                    <p className='font-semibold text-[18px]'>Build skills for today, tomorrow and Beyond <HighlightText text={"Education to Future Proof your Career"}/></p>
                    <div className='flex flex-row rounded-full bg-richblack-600 w-fit px-3 py-2 gap-5'>
                        <button className={`${accountType === "student" ? "bg-richblack-900 text-white" : "bg-transparent"} cursor-pointer px-4 py-2 rounded-full`} value="student" onClick={buttonHandler}>Student</button>
                        <button className={`${accountType === "instructor" ? "bg-richblack-900 text-white" : "bg-transparent"} cursor-pointer px-4 py-2 rounded-full`} value="instructor" onClick={buttonHandler}>Instructor</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label 
                            htmlFor='email'> Email Address <span className='text-red-800'>*</span>
                        </label>
                        <input 
                            type='text' 
                            id='email' 
                            placeholder='Enter your email here!' 
                            name="email" 
                            value={formData.email} 
                            className='py-4 px-4 rounded-md bg-richblack-700' 
                            onChange={changeHandler}/>
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label 
                            htmlFor='password'>Password <span className='text-red-800'>*</span>
                        </label>
                        <input 
                            type={showPassword ? "password" : "text"} 
                            id='password' placeholder='Enter your password here!' 
                            className='py-4 px-4 rounded-md bg-richblack-700' 
                            name="password" 
                            value={formData.password} 
                            onChange={changeHandler}/>

                        <div className="absolute cursor-pointer right-[1rem] bottom-[1rem] text-2xl" onClick={() => setShowPassword((prev) => (!prev))}>
                            {
                               showPassword ? (<RiEyeOffFill />) : (<HiEye />)
                            }
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-yellow-100 cursor-pointer text-richblack-800 rounded-md">Get Going!</button>
                    <Link to={"/forgot-password"} className='self-end text-richblue-400'>Forgot Password</Link>
                </form>
                {/* Form Image Section */}
                <div className='relative w-[500px]'>
                    <img src={Frame}/>
                    <img src={LoginImage} className='absolute -top-5 -left-5'/>
                </div> 
            </div>
        </div>)
    );
}

export default Login;
