import React from 'react'
import { Link } from "react-router-dom"

const CTAButton = ({children, linkto, active}) => {
  return (
    <Link to={linkto}>
        <button className={`${active ? "hover:cursor-pointer bg-yellow-100 px-4 py-2 font-bold rounded-md text-center text-[15px] transition-transform hover:scale-95 shadow-sm hover:shadow-yellow-300 text-black" : 
        "hover:cursor-pointer font-bold text-white px-4 py-2 rounded-md text-center text-[15px] bg-richblack-600 transition-transform hover:scale-95 shadow-sm shadow-richblack-100 hover:shadow-[0]"}`}>
            { children }
        </button>
    </Link>
  )
}

export default CTAButton;
