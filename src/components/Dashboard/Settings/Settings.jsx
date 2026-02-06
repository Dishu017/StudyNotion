import React, { useRef, useState, useEffect } from 'react'
import { LuUpload } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateProfileImage } from "../../../services/operations/settingsAPI";
import { useForm } from 'react-hook-form';
import FileSection from "./FileSection"
import UpdatePasswordSettings from './UpdatePasswordSettings';
import DeleteUser from './DeleteUser';


const Settings = () => {

  const [profileImage, setProfileImage] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  const handleButton = () => {
      fileInputRef.current.click();
  }

  const handleInput = (e) => {
      const file = e.target.files[0];
      if(file) {
          setProfileImage(file)
          setPreview(file)
      }
  }

  const setPreview = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewFile(reader.result)
      }
  }

  //console.log(token)

  const handleUpload = () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("profileImage", profileImage)
        dispatch(updateProfileImage(token, formData));
      }
      catch(error) {
        console.log(error);
      }
  }

  useEffect(() => {
      if(profileImage) {
        setPreview(profileImage)
      }
  }, [profileImage]);

  
  return (
    <div className='w-9/12 mx-auto mt-7 mb-7'>
        <div className='text-[2rem] font-bold'>Edit Profile</div>
        <section className='bg-richblack-600/45 rounded-md px-9 py-8 flex gap-x-7 mt-6'>
          <div>
            <img src={previewFile || user?.image} className='w-[78px] h-[78px] rounded-full aspect-square'/>
          </div>
          <div className='flex flex-col gap-y-4'>
            <p className='text-[1.2rem]'>Change Profile Picture</p>
            <div className='flex flex-row gap-x-3'>
                <div>
                    <button className='bg-richblack-700 px-4 py-3 rounded-md text-richblack-25 
                    cursor-pointer' onClick={handleButton}>
                        Select
                    </button>
                    <input type="file" className='hidden' onChange={handleInput} ref={fileInputRef}/>
                </div>
              <div>
                <button className='bg-amber-300 px-4 py-3 rounded-md text-richblack-700 flex items-center
                 gap-x-2 cursor-pointer' onClick={handleUpload}>
                    <p>{loading ? <span>Loading...</span> : <span>Upload</span>}</p>
                    <LuUpload />
                </button>
              </div>
            </div>
          </div>
        </section>

        <FileSection/>
        <UpdatePasswordSettings/>
        <DeleteUser/>
    </div>
  )
}

export default Settings;
