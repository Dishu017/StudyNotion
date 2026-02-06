import React from 'react'
import { FooterLink2 } from "../../../data/footer-links"
import { Link } from 'react-router-dom'
import StudyNotion from "../../../assets/Logo/Logo-Full-Light.png"

const Footer = () => {
  return (
    <div className='flex flex-col w-screen min-h-fit bg-richblack-700 text-richblack-100 py-12'>
        <div className='flex flex-row w-10/12 mx-auto justify-around border-b border-richblack-600 text-[13px]'>
            <div className='flex flex-row border-r border-richblack-600 w-[45%] justify-around px-8 gap-4'>
                <div className='flex flex-col gap-3'>
                    <img src={StudyNotion} width="160px"/>
                    <p className='font-bold text-white text-[18px]'>Company</p>
                    <p>About</p>
                    <p>Careers</p>
                    <p>Affiliates</p>
                </div>
             <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-3'>
                    <p className='font-bold text-white text-[18px]'>Resourses</p>
                    <p>Article</p>
                    <p>Blogs</p>
                    <p>Chart Sheet</p>
                    <p>Code Challenges</p>
                    <p>Docs</p>
                    <p>Projects</p>
                    <p>Workspaces</p>
                </div>
                    <div className='flex flex-col gap-3'>
                        <p className='font-bold text-white text-[18px]'>Support</p>
                        <p>Help Center</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-3'>
                        <p className='font-bold text-white text-[18px]'>Plans</p>
                        <p>Paid Membership</p>
                        <p>For Students</p>
                        <p>Business Solutions</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <p className='font-bold text-white text-[18px]'>Community</p>
                        <p>Forums</p>
                        <p>Chapters</p>
                        <p>Events</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row w-[45%] justify-around'>
                <div className='flex flex-col gap-3'>
                    <p className='text-white font-bold text-[18px]'>{ FooterLink2[0].title }</p>
                    {
                        FooterLink2[0].links.map( (element, index) => {
                            return (
                                <Link to={element.link} key={index}>
                                    { element.title }
                                </Link>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-white font-bold text-[18px]'>{ FooterLink2[1].title }</p>
                    {
                        FooterLink2[1].links.map( (element, index) => {
                            return (
                                <Link to={element.link} key={index}>
                                    { element.title }
                                </Link>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-white font-bold text-[18px]'>{ FooterLink2[2].title }</p>
                    {
                        FooterLink2[2].links.map( (element, index) => {
                            return (
                                <Link to={element.link} key={index}>
                                    { element.title }
                                </Link>
                            )
                        })
                    }
                </div>
        </div>
        </div>
        <div className='flex flex-row justify-between w-10/12 mx-auto text-[13px] py-5'>
            <div className='flex flex-row gap-2'>
                <p className='border-r border-richblack-600 px-3'>Privacy Policy</p>
                <p className='border-r border-richblack-600 px-3'>Cookie Policy</p>
                <p>Terms</p>
            </div>
            <div>
                Made by Dinesh Yadav @2025
            </div>
        </div>
    </div>
  )
}

export default Footer;
