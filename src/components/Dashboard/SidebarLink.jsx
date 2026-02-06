import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"

const SidebarLink = ({data}) => {

    //console.log(data);
    const Icon = Icons[data?.icon] || (() => <span className="text-red-500">?</span>);

    const location = useLocation();

    function matchRoute(route) {
        return matchPath({path: route}, location.pathname);
    }

    return (
        <div className='mt-7 w-full'>
            <div className={`w-full flex flex-row gap-x-3 px-3 py-2 items-center ${matchRoute(data.path) ? "bg-richblue-500": "bg-transparent"}`}>
                <Icon className="text-[1.4rem]"/>
                <Link to={data.path}>
                    <p className='text-richblack-100'>{data.name}</p>
                </Link>
            </div>
        </div>
    )
}

export default SidebarLink;
