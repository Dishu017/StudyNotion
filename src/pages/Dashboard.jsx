import { Outlet, useNavigate } from 'react-router-dom'
import { sidebarLinks } from "../data/dashboard-links"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from "../components/Dashboard/SidebarLink"
import * as Icons from "react-icons/vsc"
import { RiLogoutBoxRFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useState } from 'react'
import { logout } from "../services/operations/authAPIConnect"


const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dataToUse = [
        {
            path: "/dashboard/settings",
            name: "Settings",
            icon: "VscSettingsGear"
        }
    ];

    const [logoutModal, setLogoutModal] = useState(false);

    const { user } = useSelector((state) => state?.profile);

    return (
        <div className='w-screen min-h-[calc(100vh-3.5rem)] text-white relative'>
            <div className='w-full h-full flex flex-row'>
                <div className='w-[250px] min-h-[calc(100vh-3.5rem)] bg-richblack-800
                 border-r-richblack-600 border-r-[1px] text-white flex flex-col items-center pt-8'>
                    <img src={user?.image} className='w-[78px] aspect-square rounded-full'/> 
                    {
                        sidebarLinks.map((ele, index) => {
                            if(ele.id == 1) {
                                return (<SidebarLink data={ele} key={index}/>)
                            }
                            if(ele.type === user?.accountType) {
                                return (<SidebarLink data={ele} key={index}/>);
                            }
                            return null;
                        })
                    }
                    {/* <div className='w-9/12 mx-auto h-[1px] bg-richblack-500 my-7'></div> */}
                    {
                        dataToUse.map((ele, index) => {
                            return (<SidebarLink data={ele} key={index}/>)
                        })
                    }
                    {
                        <div className='mt-7 w-full px-3 cursor-pointer'>
                            <div className='w-full flex flex-row gap-x-3 items-center cursor-pointer'
                            onClick={() => setLogoutModal(true)}>
                                <RiLogoutBoxFill className="text-[1.4rem]"/>
                                <button>
                                    <p className='text-richblack-100 cursor-pointer'>Log Out</p>
                                </button>
                            </div>
                        </div>
                    }
                </div>
                <Outlet/>
            </div>
            {
                logoutModal && 
                (<div className='fixed inset-0  backdrop-blur-sm bg-richblack-200/45 flex justify-center items-center'>
                    <div className='border-richblack-50 border-[1px] flex flex-col justify-center items-center gap-y-5 px-9 py-6
                     bg-richblack-800/45 rounded-md fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'>
                        <h3 className='text-[1.8rem] font-bold'>Do you want to Log Out</h3>
                        <p className='text-richblack-300 text-[1.2rem]'>Click to continue</p>
                        <div className='flex flex-row gap-x-5'>
                            <button className="flex justify-center items-center text-richblack-900 bg-amber-300
                            rounded-md px-4 py-2 cursor-pointer " 
                            onClick={() => dispatch(logout(navigate))}>
                                Log Out!
                            </button>
                            <button className='bg-richblack-800 cursor-pointer text-richblack-50 px-4 py-2 rounded-md'
                            onClick={() => setLogoutModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Dashboard;
