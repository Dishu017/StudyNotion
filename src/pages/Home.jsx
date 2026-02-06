import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4"
import CodeBlock from "../components/core/HomePage/CodeBlock";
import TagSelectSection from "../components/core/HomePage/TagSelectSection"
import TimeLineSection from "../components/core/HomePage/TimeLineSection"
import SwissKnifeSection from "../components/core/HomePage/SwissKnifeSection"
import KnowAboutSection from "../components/core/HomePage/KnowAboutSection";
import Footer from "../components/core/HomePage/Footer";
import ReviewSliderSection from "../components/common/ReviewSliderSection";

const Home = () => {
    
    const typeanimationString = `<!doctype html>\n <html lang="en">\n<head><meta charset="UTF-8" />\n<link rel="icon" type="image/svg+xml" href="/vite.svg" />\n
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Vite + React</title>`

    return (
        <div className="w-10/12 mx-auto min-h-screen flex flex-col text-richblack-200 items-center">
            {/* {Section1} */}
            <Link to="/signup">
                <div className="w-full h-fit flex flex-col items-center mt-6">
                    <div className="flex flex-row px-4 py-2 items-center gap-2 transition-transform 
                    duration-200 hover:scale-95 bg-richblack-800 rounded-full group hover:bg-richblack-900
                    border-[4px] border-richblack-800">
                        <button className="group-hover:cursor-pointer">Become an Instructor</button>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>
             <div className="text-4xl mt-4 font-bold">
                Empower Your Future With <HighlightText text={"Coding Skills"}/>
            </div>
            <div className="mt-4 text-richblack-200 text-center font-bold">
                With our online coding courses, you can learn at your own pace, from anywhere in the world,<br/>
                and get access to a wealth of resourses, including hands on project, quizzes and personalised 
                feedback from Instructors.
            </div>
            <div className="flex justify-center gap-6 mt-4 text-richblack-900">
                <CTAButton linkto={"/contactus"} active={true}>
                    Learn More
                </CTAButton>
                <CTAButton linkto={"/signup"} active={false}>
                    Book a demo
                </CTAButton>
            </div>
            <div className="w-11/15 mt-[4rem] bg-white h-fit shadow-toplg">
                <video autoPlay loop muted className="relative -top-3 -left-3 ">
                    <source src={Banner} type="video/mp4"/>
                </video>
            </div>

            {/* {Section2} */}

            <div className="w-9/12 mx-auto mt-12">
               <CodeBlock
                    position="lg:flex-row"
                    heading={<div className="text-3xl font-bold">
                    Unlock your <HighlightText text={"Coding Potential"}/> <br/> with our online courses
                    </div>}
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabutton1={{
                        linkto:"/signup",
                        text: "Try it yourself",
                        active: true,
                    }} 
                    ctabutton2={{
                        linkto:"/signup",
                        text: "Learn more",
                        active: false,
                    }}
                    html={typeanimationString}
                    left={true}
               />   
            </div>

            <div className="w-9/12 mx-auto mt-12 mb-12">
               <CodeBlock
                    position="lg:flex-row-reverse"
                    heading={<div className="text-3xl font-bold">
                    Start <HighlightText text={"Coding in Seconds!"} />
                    <br/>with our online courses
                    </div>}
                    subheading={"Go ahead give it a try. Our hands on learning environment means you will be writing code from the very first session."}
                    ctabutton1={{
                        linkto:"/signup",
                        text: "Continue Lesson",
                        active: true,
                    }} 
                    ctabutton2={{
                        linkto:"/signup",
                        text: "Learn more",
                        active: false,
                    }}
                    html={typeanimationString}
               />   
            </div>

            {/* Section 3 */}

            <TagSelectSection/>
            <div className="bg-image bg-white w-screen min-h-[20rem] flex justify-center items-center">
                <div className="w-11/12 flex justify-center mx-auto gap-4">
                    <CTAButton active={true} linkto={"/signup"}>
                        Explore full Catalog
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Learn More
                    </CTAButton>    
                </div>
            </div>

            {/* Section-4 */}

            <TimeLineSection/>

            <SwissKnifeSection/>

            <KnowAboutSection/>

            <ReviewSliderSection/>

            <Footer/>

        </div>
    );
}

export default Home;