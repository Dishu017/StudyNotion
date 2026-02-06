import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from "../../core/HomePage/HighlightText"
import CTAButton from './CTAButton'

const KnowAboutSection = () => {
  return (
    <div className='w-screen min-h-max p-[5rem]'>
        <div className='w-10/12 mx-auto'>
            <div className='w-full flex flex-row items-center gap-[5rem]'>
                <div className='relative w-[47%] bg-white min-h-max'>
                    <img src={Instructor} className='invisible'/>
                    <img src={Instructor} className='absolute top-5 left-5 object-contain'/> 
                </div>
                <div className='flex flex-col w-[47%] justify-between gap-10'>
                    <div className='text-4xl'>Become an <HighlightText text={"Instructor"}/></div>
                    <div className='text-richblack-300'>
                        Instructors from around the world teach millions of students on Studynotion.
                        We provide the tools and platform to teach you what you love and get better at it.
                    </div>
                    <div>
                        <CTAButton active={true} linkto={"/signup"}>
                            Start Teaching Today
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default KnowAboutSection
