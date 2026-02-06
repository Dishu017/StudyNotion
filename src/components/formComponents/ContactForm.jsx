import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import countryCode from "../../data/countrycode.json";
import { useDispatch } from 'react-redux';
import { ContactUs } from "../../services/operations/ContactApiConnect";

const ContactForm = () => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                message: "",
                phone: "",
                countryCode: "",
                email: "",
            })
        }
    }, [reset, isSubmitSuccessful]);

    const submitForm = (data) => {
        
        const phoneNumber = data.countryCode + data.phone;
        delete data.countryCode;
        delete data.phone;
        const finalData = {
            ...data,
            phoneNumber,
        }
        console.log("new", finalData);
        dispatch(ContactUs(finalData));

    }

    return (
        <div className='lg:w-[600px] mt-5'>
            <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-y-5'>
                <div className='flex flex-row justify-between gap-x-3'>
                    <label className='flex flex-col gap-y-3 w-full'>
                        <p>First Name<span className='text-red-600'>*</span></p>
                        <input
                            className='bg-richblack-600 py-3 px-4 rounded-md'
                            placeholder='Enter your name'
                            type="text"
                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "Enter your name"
                                }
                            })}
                        />
                        {
                            errors.firstName && 
                            (<span className='text-red-600'>{errors.firstName.message}</span>)
                        }
                    </label>
                    <label className='flex flex-col gap-y-3 w-full'>
                        <p>Last name<span className='text-red-600'>*</span></p>
                        <input
                            type="text"
                            className='bg-richblack-600 py-3 px-4 rounded-md'
                            placeholder='Enter your last name'
                            {...register("lastName", {
                                required: {
                                    value: true,
                                    message: "Last name is required"
                                }
                            })}
                        />
                        {
                            errors.lastName &&
                            (<span className='text-red-600'>{errors.lastName.message}</span>)
                        }
                    </label>
                </div>
                <label className='w-full flex flex-col gap-y-3'>
                    <p>Enter Email Address<span className='text-red-600'>*</span></p>
                    <input
                        className='bg-richblack-600 px-3 py-4 rounded-md w-full'
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Enter Valid email address"
                            }
                        })}
                        placeholder="Enter email address here..."
                    />
                    {
                        errors.email && 
                        (<span className='text-red-600'>{errors.email.message}</span>)
                    }
                </label>

                <div className='flex flex-col gap-y-2'>
                    <p>Enter Phone</p>
                    <div className='flex flex-row justify-between'>
                        <select {...register('countryCode')} className='appearance-none rounded-md w-[160px] bg-richblack-600 px-4 py-3'>
                            {
                                countryCode.map((ele, index) => {
                                    return <option key={index} value={ele.code}>{ele.code}-{ele.country}</option>
                                })
                            }
                        </select>
                        <input
                            type="text"
                            placeholder='Enter your phone number'
                            className='rounded-md px-4 py-3 bg-richblack-600 w-[70%]'
                            {...register("phone")}
                        />
                        {
                            errors.phone && 
                            (<span className='text-red-600'>{errors.phone.message}</span>)
                        }
                    </div>
                </div>
                <label className='flex flex-col gap-y-3'>
                    <p>Message</p>
                    <textarea
                        className='rounded-md bg-richblack-600 px-4 py-3'
                        rows={7}
                        cols={60}
                        {...register("message")}
                    />
                </label>
                <button className='mb-18 rounded-md w-full bg-amber-400 text-richblack-800 cursor-pointer px-4 py-4' type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default ContactForm;
