import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { Link, useLocation, matchPath, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from "../core/auth/ProfileDropDown"
import { apiconnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState, useEffect } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { getAllCategory } from "../../services/operations/categoryAPI"
import { setCategoryData } from '../../redux/slices/courseSlice'

const NavBar = () => {

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    //const dummySublinks = [{title: "Python", path: "/python"}, {title: "Web Dev", path: "/web-dev"}]

    useEffect(() => {
        const getCategoryEffect = async () => {
            setLoading(true)
            try {
                const result = await getAllCategory();
                setSubLinks(result);
                console.log("NavBar", result);
                dispatch(setCategoryData(result));
            } catch(error){
                console.log("error", error.message);
            }
            setLoading(false);
        }
        getCategoryEffect();
    }, []);

    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const navigate = useNavigate();

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='w-screen h-14 bg-richblack-900 border-b border-b-richblack-700'>
        <div className='w-9/12 h-full mx-auto flex flex-row items-center justify-between'>
            <Link to={"/"}>
                <img src={logo} className='w-[160px] cursor-pointer'/>
            </Link>
            <div className='text-richblack-25 flex flex-row justify-around gap-x-4'>
                {
                    NavbarLinks.map((element, index) => (
                        element.title === "Catalog" ? 
                            (<div className='flex items-center justify-around cursor-pointer group relative' key={index}>
                                <div className="flex items-center cursor-pointer">
                                    <p className='group-hover:text-amber-300'>{element.title}</p>
                                    <RiArrowDropDownLine size={26}/>
                                </div>
                                <div className='p-5 lg:w-[14rem] lg:min-h-[4rem] invisible group-hover:visible absolute bg-white opacity-0
                                rounded-md top-0 mt-7 left-1 translate-x-[-20%] transition-opacity group-hover:opacity-100 duration-300'>
                                    <div className='bg-white w-[2rem] h-[2rem] absolute -top-1 translate-x-[5.8rem] rounded-md rotate-45'/>
                                    {
                                        subLinks.map((ele, index) => (
                                            <Link to={`catalog/${ele.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                <p 
                                                className={`text-richblack-900 text-[1.1rem] px-3 py-2 rounded-md my-2 hover:bg-richblack-300 hover:text-richblack-800`}
                                                >
                                                    {ele.name}
                                                </p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ) :
                        (
                            <Link to={element.path} key={index}>
                                <p className={`${matchRoute(element.path) ? "text-amber-300" :
                                "text-richblack-25"}`}>
                                    { element.title }
                                </p>
                            </Link>
                        )
                    ))
                }
            </div>
            <div className='flex flex-row justify-around items-center gap-x-5'>
                {/* Conditional rendering important */}
                {
                    user && 
                    user?.accountType !== "Instructor" && 
                    <Link to="/dashboard/cart" className='relative'>
                        <FaCartShopping className='text-[1.5rem]'/>
                        {
                            totalItems > 0 && 
                            (<span className='absolute rounded-full px-2 py-1 -top-3 text-[0.6rem] -right-2 bg-amber-500'>{totalItems}</span>)
                        }
                    </Link>
                }
                {
                    token === null ?
                    (<div className='flex flex-row justify-around items-center gap-x-4'>
                        <button className="cursor-pointer border border-richblack-700 bg-richblack-800 rounded-md px-4 py-2" onClick={() => navigate("/login")}>Log In</button>
                        <Link to={"/signup"}>
                            <button className="cursor-pointer border bg-richblack-800 border-richblack-700 px-4 py-2 rounded-md">Sign Up</button>
                        </Link>
                    </div>):
                    (<ProfileDropDown/>)
                }
            </div>
        </div>
        </div>
    )
    }

export default NavBar;
