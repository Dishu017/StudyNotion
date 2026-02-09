import React, { useState } from "react"
import SignupImage from "../assets/Images/signup.webp"
import Frame from "../assets/Images/frame.png"
import HighlightText from "../components/core/HomePage/HighlightText"
import CountryCode from "../data/countrycode.json"
import { RiEyeOffFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setSignUpData } from "../redux/slices/authSlice"
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPIConnect"


const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "student"
    });

    const [accountType, setAccountType] = useState("student");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleButton = (e) => {
        e.preventDefault();
        setAccountType(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            accountType: e.target.value,
        }))
    }

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        console.log(formData.email);

        dispatch(setSignUpData(formData));
        dispatch(sendOtp(formData.email, navigate));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            //phoneNumber: "",
            password: "",
            confirmPassword: "",
            accountType: "student"
        });
        
        setAccountType("student");

        navigate("/verify-email");
    }
    
    return (
        <div className="w-screen min-h-screen bg-richblack-900 text-richblack-25">
            <div className="w-10/12 mx-auto flex flex-row justify-around py-24">
                <form  className="w-[40%] flex flex-col gap-4" onSubmit={submitHandler}>
                    <h1 className="text-[2rem] font-bold">Join the millions learning to code with StudyNotion for free</h1>
                    <p className="">
                        Build skills for today, tomorrow and beyond 
                        <HighlightText text={" Education to future proof your career"}/>
                    </p>
                    <div className='flex flex-row justify-between rounded-full bg-richblack-600 w-fit px-3 py-1 gap-4'>
                        <button className={`${accountType === "student" ? "bg-richblack-900 text-white" : "bg-transparent" }  py-2 px-3 rounded-full cursor-pointer`} value="student" onClick={handleButton}>Student</button>
                        <button className={`${accountType === "instructor" ? "bg-richblack-900   text-white" : "bg-transparent" } py-2 px-3 rounded-full cursor-pointer`} value="instructor" onClick={handleButton}>Instructor</button>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="firstName">First Name<span className="text-red-800"> * </span></label>
                            <input
                                type="text"
                                name="firstName"
                                className="px-4 py-2 bg-richblack-600 rounded-md"
                                id="firstName"
                                placeholder="Enter your First name"
                                value={formData.firstName}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="lastName">Last name<span className="text-red-800"> * </span></label>
                            <input
                                type="text"
                                name="lastName"
                                className="px-4 py-2 bg-richblack-600 rounded-md"
                                id="lastName"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email Address <span className="text-red-800"> * </span></label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            className="px-4 py-2 bg-richblack-600 rounded-md"
                            placeholder="Enter your email id:"
                            value={formData.email}
                            onChange={changeHandler}
                        />
                    </div>
                    {/* <div className="flex flex-col items-start gap-4">
                        <label htmlFor="countrycode">Phone number <span className="text-red-800">*</span></label>
                        <div className="flex flex-row gap-4">
                            <select 
                            className="px-2 py-2 bg-richblack-600 rounded-md w-[5rem]"
                            name="countryCode"
                            value="+91"
                            id="countrycode">
                                {
                                    CountryCode.map( (ele, index) => {
                                        return <option value={ele.country}>{ele.code}</option>
                                    })
                                }
                            </select>
                            <input
                                type="number"
                                name="phoneNumber"
                                className="px-4 py-2 bg-richblack-600 rounded-md"
                                placeholder="123456789"
                                value={formData.phoneNumber}
                                onChange={changeHandler}
                            />
                        </div>
                    </div> */}
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="password"> Password <span className="text-red-800"> * </span></label>
                            <input
                                type={`${showPassword ? "text" : "password"}`}
                                name="password"
                                className="px-4 py-2 bg-richblack-600 rounded-md"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={changeHandler}
                            />
                            <div className="absolute cursor-pointer right-2 bottom-3" onClick={() => setShowPassword((prev) => (!prev))}>
                                {
                                    showPassword ? (<RiEyeOffFill />) : (<HiEye />)
                                }
                            </div>
                            
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="confirmPassword">Confirm Password<span className="text-red-800"> * </span></label>
                            <input
                                type={`${showConfirmPassword ? "text" : "password"}`}
                                name="confirmPassword"
                                className="px-4 py-2 bg-richblack-600 rounded-md"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={changeHandler}
                            />
                            
                            <div className="absolute cursor-pointer right-2 bottom-3" onClick={() => setShowConfirmPassword((prev) => (!prev))}>
                                {
                                    showConfirmPassword ? (<RiEyeOffFill />) : (<HiEye />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="w-full py-3 px-4 bg-yellow-100 cursor-pointer text-richblack-800 rounded-md">Create Account</button>
                    </div>
                    

                </form>
                <div className="relative w-[40%]">
                    <img src={SignupImage} className="absolute -top-4 -left-4"/>
                    <img src={Frame}/>
                </div>
            </div>
        </div>
    )
}

export default Signup;