import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { SlArrowDown } from "react-icons/sl";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/operations/authAPIConnect';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';


const ProfileDropDown = () => {

    const { user } = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        dispatch(logout(navigate));
        setOpen(false);
    }

    useOnClickOutside(ref, () => setOpen(false));

    return (
      <div>
          <button className='flex justify-center items-center gap-x-4 relative'>
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className='w-[30px] rounded-full aspect-square'
            />
            <div className='flex justify-center items-center cursor-pointer' onClick={() => setOpen(true)}>
              <SlArrowDown />
            </div>
            {
               open && (
                <div ref={ref} className='absolute z-[20] top-[2.3rem] rounded-md bg-richblack-600 border-richblack-400 
                  w-[200px] h-[8rem] flex flex-col justify-around divide-richblack-400 divide-y-1 px-5' onClick={(e) => e.stopPropagation()}>
                    <Link to={"/dashboard"} onClick={() => setOpen(false)} className='pb-6'>Dashboard</Link>
                    <div className='cursor-pointer' onClick={logoutHandler}>Log Out</div>
                </div>
               )
            }
          </button>
      </div>
    );
}

export default ProfileDropDown;
