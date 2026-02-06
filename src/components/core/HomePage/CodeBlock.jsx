import React from 'react'
import CTAButton from './CTAButton';
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({position, heading, subheading, ctabutton1, ctabutton2, html}) => {
  return (
    <div className={`flex ${position} w-full justify-between`}>
       <div className='w-7/15 flex flex-col gap-4 justify-between'>
            {heading}
            <div className="text-richblack-200 font-bold text-[0.8rem]">
                {subheading}
            </div>
            <div className='flex flex-row gap-12 mt-7'>
                <CTAButton linkto={ctabutton1.linkto} active={ctabutton1.active}>{ctabutton1.text}</CTAButton>
                <CTAButton linkto={ctabutton2.linkto} active={ctabutton2.active}>{ctabutton2.text}</CTAButton>
            </div>
       </div>
       <div className='w-7/15'>
          <div className='flex flex-row w-full border-[0.8px] border-richblue-500 p-2 bg-richblue-400/15 rounded-md'>
            <div className='w-[10%] flex flex-col items-center'>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
            </div>
            <div className='w-[90%] text-red-500'>
              {
                <TypeAnimation
                  sequence={[
                    html,
                    500,
                    ""
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  omitDeletionAnimation={true}
                  style={
                    {
                      whiteSpace: "pre-line",
                      display: "block"
                    }
                  }
                />
              }
            </div>
          </div>
       </div>
    </div>
  )
}

export default CodeBlock;
