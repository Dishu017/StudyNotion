import React from 'react'
import { MdAutoDelete } from "react-icons/md";
import { deleteUser } from "../../../services/operations/settingsAPI"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteUser(token, navigate))
    }
    
    return (
        <div className='bg-red-800/45 rounded-md px-16 py-8 mt-8'>
            <div className='flex justify-start gap-x-5'>
                <div className='text-red-800 text-6xl'>
                    <MdAutoDelete />
                </div>
                <div className='flex flex-col gap-y-4 text-red-300'>
                    <h3 className='font-bold text-white text-2xl'>Delete Account</h3>
                    <p>Would you like to delete account?</p>
                    <p>
                        This account may contain paid courses. Removing the account may roll you out of 
                        all the courses
                    </p>
                    <button onClick={handleDelete} className='justify-self-start cursor-pointer w-fit rounded-md
                     bg-red-600 px-4 py-3 text-white'>Delete My Account</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser;
