import HighlightText from '../components/core/HomePage/HighlightText'
import About1 from "../assets/Images/aboutus1.webp"
import About2 from "../assets/Images/aboutus2.webp"
import About3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import CTAButton from '../components/core/HomePage/CTAButton'
import ContactForm from '../components/formComponents/ContactForm'

const AboutUs = () => {
  return (
    <div className='w-screen min-h-screen'>
        <section className='bg-white/15 w-full pt-13'>
            <div className='w-9/12 mx-auto flex flex-col gap-y-6'>
                <div className='w-2/3 mx-auto flex flex-col gap-y-3'>
                    <h1 className='text-[2rem] font-semibold text-center'>
                        Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/>
                    </h1>
                    <h3 className='text-[1rem] text-center text-richblack-400'>
                        StudyNotion is at the forefront of driving innovation in online education.
                        We are passionately about creating a brighter future by offering cutting edge courses,
                        leveraging imerging edge technologies and nurturing a vibrant learning community. 
                    </h3>
                </div>
                <div className='flex flex-row gap-x-6 w-full'>
                    <img src={About1} className='lg:w-[350px] object-contain translate-y-1/5'/>
                    <img src={About2} className='lg:w-[350px] object-contain translate-y-1/5'/>
                    <img src={About3} className='lg:w-[350px] object-contain translate-y-1/5'/>
                </div>
            </div>
        </section>
        <section className='mt-15 pt-10 w-9/12 mx-auto'>
            <h1 className='text-[1.8rem] text-center w-8/10 mx-auto'>
                We are passionate about revolutionizing the way we learn.
                Our innovative platform combines technology, <span className='text-amber-500'>expertise</span>, and community create an 
                <span className='text-amber-200'> Unparalled Education Experience.</span>
            </h1>
            <div className='flex flex-row flex-wrap mt-15 justify-between items-center'>
                <div className='w-[42%] flex flex-col gap-y-7'>
                    <h2 className='text-amber-700 text-[1.8rem]'>Our Founding Story</h2>
                    <div className='text-[0.8rem] flex flex-col gap-y-7 text-richblack-400'>
                        <p>
                            Our e-learning platform was born out of a shared vision and passion for transforming 
                            education. It all began with a group of educators, technologists, and lifelong learners 
                            who recognized the need for accessible, flexible, and high-quality learning opportunities 
                            in a rapidly evolving digital world.
                        </p>
                        <p>
                            As experienced educators ourselves, we witnessed firsthand the limitations and 
                            challenges of traditional education systems. We believed that education should 
                            not be confined to the walls of a classroom or restricted by geographical boundaries. 
                            We envisioned a platform that could bridge these gaps and empower individuals from all 
                            walks of life to unlock their full potential.
                        </p>
                    </div>
                </div>
                <div className='shadow-toplg'>
                    <img src={FoundingStory}/>
                </div>
            </div>
        </section>
        <section className='w-9/12 mx-auto flex flex-row justify-between mt-18 pt-10'>
            <div className='w-[42%] text-[0.9rem] text-richblack-400 flex flex-col gap-y-7'>
                <h1 className='text-[2rem] font-bold text-amber-700'>Our Vision</h1>
                <p>
                    With this vision in mind, we set out on a journey to create an e-learning platform 
                    that would revolutionize the way people learn. Our team of dedicated experts worked 
                    tirelessly to develop a robust and intuitive platform that combines cutting-edge 
                    technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>
            </div>
            <div className='w-[42%] text-[0.9rem] text-richblack-400 flex flex-col gap-y-7'>
                <h1 className='text-[2rem] font-bold text-richblue-300'>Our Mission</h1>
                <p>
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant 
                    community of learners, where individuals can connect, collaborate, and learn from one 
                    another. We believe that knowledge thrives in an environment of sharing and dialogue, 
                    and we foster this spirit of collaboration through forums, live sessions, and networking 
                    opportunities.
                </p>
            </div>
        </section>
        <section className='flex flex-row bg-richblack-700 lg:h-[10rem] mt-18'>
            <div className='w-9/12 flex mx-auto justify-around py-10'>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-3xl'>5K</h2>
                    <p className='text-richblack-400'>Active Students</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-3xl'>10+</h2>
                    <p className='text-richblack-400'>Mentors</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-3xl'>200+</h2>
                    <p className='text-richblack-400'>Courses</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-3xl'>50+</h2>
                    <p className='text-richblack-400'>Awards</p>
                </div>
            </div>
        </section>
        <section className='w-9/12 mx-auto mt-18'>
            <div className='w-full grid grid-cols-4 grid-rows-2'>
                <div className='col-span-2 flex flex-col gap-y-5'>
                    <h2 className='font-bold text-[2rem]'>
                        World Class Learning for <HighlightText text={"Anyone, Anywhere"}/>
                    </h2>
                    <p className='text-semibold text-richblack-600'>
                        StudyNotion partners with more than 275+ leading universities and companies 
                        to bring flexible, affordable, job-relevant online learning to individuals and organisations
                        worldwide.
                    </p>  
                    <CTAButton linkto={"/"} active={true}>Learn More</CTAButton>
                     
                </div>
                <div className='bg-richblack-700 p-6 flex flex-col gap-y-5'>
                    <p>Curriculum Based on Industry Needs</p>
                    <p className='text-[0.9rem] text-richblack-500'>
                        Save time and money! The wonderful curriculum is made to be easier to understand and in line
                        with industry needs
                    </p>
                </div>
                <div className='bg-richblack-800 p-6 flex flex-col gap-y-6'>
                    <p>Our Industry Methods!</p>
                    <p className='text-[0.9rem] text-richblack-500'>
                        StudyNotion partners with more than 275+ leading universities and companies to bring talent!
                    </p>
                </div>
                <div className='col-start-2 bg-richblack-700 p-6 flex flex-col gap-y-6'>
                    <p>Certification</p>
                    <p className='text-[0.9rem] text-richblack-500'>
                        StudyNotion partners with more than 275+ leading universities and companies to bring talent!
                    </p>
                </div>
                <div className='bg-richblack-800 p-6 flex flex-col gap-y-6'>
                    <p>Rating "Auto Grading"</p>
                    <p className='text-[0.9rem] text-richblack-500'>
                        StudyNotion partners with more than 275+ leading universities and companies to bring talent!
                    </p>
                </div>
                <div className='bg-richblack-700 p-6 flex flex-col gap-y-6'> 
                    <p>Ready to work</p>
                    <p className='text-[0.9rem] text-richblack-500'>
                        StudyNotion partners with more than 275+ leading universities and companies to bring talent!
                    </p>
                </div>
            </div>
        </section>
        <section className='mt-18 w-9/12 mx-auto flex justify-center'>
           <div className='flex flex-col items-center'>
                <h2 className='font-semibold text-[2.3rem]'>Get in Touch</h2>
                <p className='text-richblack-300'>We would love to hear from you! Please fill out this form!</p>
                <ContactForm/>
           </div>
        </section>
    </div>
  )
}

export default AboutUs;
