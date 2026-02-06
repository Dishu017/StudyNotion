import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from "../../../data/homepage-explore"

const tagNames = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const TagSelectSection = () => {

    const [tagNameSelected, setTagNameSelected] = useState(tagNames[0]);
    const [selectedCourse, setSelectedCourse] = useState(HomePageExplore[0].courses);
    const [selectedCard, setSelectedCard] = useState(HomePageExplore[0].courses[0].heading);

    const setTabSection = (value) => {
        setTagNameSelected(value);
        const newArrayToRender = HomePageExplore.filter( (element, index) => element.tag === value);
        setSelectedCourse(newArrayToRender[0].courses);
        setSelectedCard(newArrayToRender[0].courses[0].heading);
    }

    const setCard = (value) => {
        setSelectedCard(value)
    }

    return (
        <div className='w-10/12 mx-auto'>
            <div className="flex flex-col items-center py-4 mb-3">
                <div className="font-bold text-[2.3rem]">
                    Unlock the <HighlightText text={"Power of Code"}/>
                </div>
                <div className="text-richblack-500">
                    Learn to build anything you can imagine
                </div>
                <div className='flex flex-row rounded-full gap-2 px-3 py-1 bg-richblack-700 mt-12'>
                    {
                        tagNames.map( (element, index) => {
                            return (
                                <div className={`w-fit px-4 py-1 box-border cursor-pointer rounded-full hover:bg-richblack-800 ${tagNameSelected === element ? "bg-richblack-900 text-richblack-50" : "bg-transparent"}`} 
                                onClick={() => setTabSection(element)} key={index}>
                                    { element }
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-row justify-between items-stretch'>
                    {
                        selectedCourse.map( (ele,index) => {
                            return (
                                <div key={index} className={`w-[30%] min-h-fit ${selectedCard === ele.heading ? "bg-richblack-800 text-richblack-50" :
                                "bg-richblack-50 text-richblack-900"} cursor-pointer p-4 rounded-md flex flex-col justify-between gap-8 translate-y-[6rem]`} 
                                onClick={() => setCard(ele.heading)}>
                                    <p className='font-bold text-[20px]'>{ele.heading}</p>
                                    <p className='text-[14px]'>{ele.description}</p>
                                    <div className='w-full h-[0.8px] bg-richblue-400'/>
                                    <div className='flex justify-between text-richblue-300'>
                                        <p>{ele.level}</p>
                                        <p>{ele.lessionNumber}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default TagSelectSection;
