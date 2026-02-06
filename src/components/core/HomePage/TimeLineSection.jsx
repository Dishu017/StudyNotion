import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

const TimeLineSection = () => {
  return (
    <div className='w-screen min-h-max bg-white text-black py-[1rem]'>
       <div className='w-9/12 h-full mx-auto flex flex-col gap-6'>
            <div className='flex flex-row justify-around items-start'>
                <div className='w-[45%] text-4xl'>
                    Get the skills you need for a <HighlightText text={"job that is in demand"}/>
                </div>
                <div className='w-[45%] flex flex-col gap-5'>
                    <div className='text-richblack-300'> 
                        The modern Studynotion is one of the best Learning Platform developed by Dinesh 
                        which is tailored to be adaptable by students easily
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>   
            <div className='flex flex-row justify-around mt-[3rem] items-center'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-6 items-start'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='bg-gray-200 rounded-full w-[50px] h-[50px] grid place-content-center'>
                                <img src={Logo1}/>
                            </div>
                            <div className='w-[2px] bg-richblack-200 h-6'></div>
                        </div>
                        <div>
                            <p className='font-bold'>LeaderShip</p>
                            <p>Fully committed to the success!</p>
                        </div>
                    </div>

                    <div className='flex flex-row gap-6 items-start'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='bg-gray-200 rounded-full w-[50px] h-[50px] grid place-content-center'>
                                <img src={Logo2}/>
                            </div>
                            <div className='w-[2px] bg-richblack-200 h-6'/>
                        </div>
                        <div>
                            <p className='font-bold'>Responsibilty</p>
                            <p>Students will always be our top priority</p>
                        </div>
                    </div>
        
                    <div className='flex flex-row gap-6 items-start'>
                        <div className='flex flex-col items-center gap-2'>
                                <div className='bg-gray-200 rounded-full w-[50px] h-[50px] grid place-content-center'>
                                    <img src={Logo3}/>
                                </div>
                                <div className='w-[2px] bg-richblack-200 h-6'/>
                        </div>
                        <div>
                            <p className='font-bold'>Flexibility</p>
                            <p>The ability to switch is an important skill</p>
                        </div>
                    </div>
                    {/* <div className='border-r-2 border-richblack-200 w-[25px] h-[40px] my-[0.7em]'/> */}
                    <div className='flex flex-row gap-6 items-start'>
                        <div className='bg-gray-200 rounded-full w-[50px] h-[50px] grid place-content-center'>
                            <img src={Logo4}/>
                        </div>
                        <div>
                            <p className='font-bold'>Solve the problem</p>
                            <p>Code your way to a solution</p>
                        </div>
                    </div>   
                </div> 
                <div className='w-[52%] bg-white shadow-toplg border-[10px] border-white relative'>
                    <img src={TimeLineImage} className='object-fit'/>
                    <div className='bg-green-900 w-[75%] h-max absolute -bottom-[2em] right-[4rem] text-richblack-50
                    flex flex-row justify-around items-center px-5 py-5 gap-4'>
                        <div className='flex flex-row justify-around items-start w-[50%]
                        border-r-2 border-gray-300 gap-2'>
                            <div className='lg:text-[2rem]'>10</div>
                            <div>YEARS <br/>EXPERIENCE</div>
                        </div>
                        <div className='flex flex-row justify-around items-start gap-4'>
                            <div className='text-[2rem]'>250</div>
                            <div>TYPES OF<br/>COURSES</div>
                        </div>
                    </div>
                </div>    
            </div>
       </div>
       
    </div>
  )
}

export default TimeLineSection
