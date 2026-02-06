import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { capitalizeWords } from "../utils/formattedString"
import { getCategoryPageDetails } from '../services/operations/categoryAPI';
import CourseCard from '../components/common/CourseCard';
import { useEffect } from 'react';
import Footer from "../components/core/HomePage/Footer";
import SwiperSlideFile from '../components/common/SwiperSlideFile';

const Catalog = () => {
    
    let result;

    const { categoryName } = useParams();
    const { categoryData } = useSelector((state) => state.course);
    const [ categoryPageData, setCategoryPageData ] = useState(null);
    const [ selected, setSelected ] = useState("New");

    const categoryFormated = capitalizeWords(categoryName);
    //console.log("categoryFormated", categoryFormated);

    const categoryId = categoryData?.filter((ele) => ele.name === categoryFormated)[0]._id;
    //console.log("Category-Id", categoryId);
    
    useEffect(() => {
        const initialRun = async () => {
            // console.log("Hii");

            result = await getCategoryPageDetails({categoryId});
            // console.log("Result", result);

            setCategoryPageData(result);
        }
        initialRun();
    }, [])
    
    return (
        <div className='w-full'>   
            <section className='bg-richblack-700 py-20 px-10 mb-5'>
                <div className='w-10/12 mx-auto flex flex-col gap-y-5'>
                    <div className='flex gap-x-2 text-2xl'>
                        <Link>
                            <p>Home /</p>
                        </Link>
                        <Link>
                            <p>Catalog /</p>
                        </Link>
                        <div>
                            <p className='text-amber-400'>{categoryFormated}</p>
                        </div>
                    </div>
                    <div className='text-3xl'>
                        {categoryFormated}
                    </div>
                    <div className='text-2xl'>
                        {categoryData?.filter((ele, index) => ele.name === categoryFormated)[0].description}
                    </div>
                </div>
            </section>
            <section className='w-10/12 mx-auto px-9 mt-10 flex flex-col gap-y-5 mb-7'>
                <h1 className='text-3xl font-bold'>Courses to get you started</h1>
                <div className='flex gap-x-4'>
                    <div
                    className={`text-[1.2rem] cursor-pointer ${selected === "MostPopular" && "text-amber-600"}`}
                    onClick={() => setSelected("MostPopular")}>
                        Most Popular
                    </div>
                    <div
                    className={`text-[1.2rem] cursor-pointer ${selected === "New" && "text-amber-600"}`}
                    onClick={() => setSelected("New")}>
                        New
                    </div>
                </div>
                <hr className='my-3 text-richblack-600'/>
                <div>
                    {
                        ( selected === "MostPopular" ) ? 
                        (<div>
                            {
                                categoryPageData?.topSellingCourses ? 
                                (
                                    <SwiperSlideFile slideData={categoryPageData?.topSellingCourses}/>
                                ) : 
                                (
                                    <div> No Course Added yet!</div>
                                )
                            }
                        </div>) :
                        (<div>
                            { categoryPageData?.latestCourse ? (
                                <div>
                                    { <CourseCard courseCardData={categoryPageData.latestCourse[0]}/> }
                                </div>
                            ): (<div> No Course Added yet!</div>)}
                        </div>)
                    }
                </div>
            </section>
            <section
            className='w-10/12 mx-auto px-9 mt-10 flex flex-col gap-y-5 mb-7'>
                <h2
                className='text-3xl font-bold'>
                    {`Top Courses in ${categoryPageData?.differentCourses[0].name}`}
                </h2>
                <hr className='my-3 text-richblack-600'/>
                <div>
                    <CourseCard courseCardData={categoryPageData?.differentCourses[0].courses[0]}/>
                </div>
            </section>
            <section
            className='w-10/12 mx-auto px-9 mt-10 flex flex-col gap-y-5 mb-7'>
                <h2 className='text-3xl font-bold'>Frequently Bought</h2>
                <hr className='my-3 text-richblack-600'/>
                <div className='grid grid-cols-2 w-full h-full'>
                    {
                        categoryPageData?.topSellingCourses.slice(0,4).map((ele, index) => (
                            <CourseCard courseCardData={ele} Height={true} key={index}/>
                        ))
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Catalog;
