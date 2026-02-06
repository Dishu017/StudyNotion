import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'

const SwissKnifeSection = () => {
  return (
    <div className='w-screen min-h-max bg-white py-[7rem]'>
        <div className='w-10/12 mx-auto flex flex-col bg-white text-richblack-900 gap-4 items-center'>
            <div className='text-center text-4xl'>
                Your Swiss Knife for <HighlightText text={"Learning any Language"}/>
            </div>
            <div className='text-center'>
                Using spin making learn multiple languages easily, with 20+ languages voice-over <br/>
                progress tracking, custom schedule or more
            </div>
            <div className='flex gap-1'>
                <img src={knowYourProgress} className='object-contain -mr-[6rem]'/>
                <img src={compareWithOthers} className='object-contain'/>
                <img src={planYourLesson} className='object-contain -ml-[8rem]'/>
            </div>  
            <div className='mx-auto text-white'>
                <CTAButton active={true} linkto={"/signup"}>
                    Know More
                </CTAButton>
            </div>
        </div>
    </div>
    
  )
}

export default SwissKnifeSection
