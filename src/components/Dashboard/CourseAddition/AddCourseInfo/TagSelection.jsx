import React from 'react'
import { useState, useEffect } from 'react';


const TagSelection = ({name, register, setValue}) => {

    const [tag, setTag] = useState(null);
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        register(name, {required: true})
    }, []);

    useEffect(() => {
        setValue(name, tagList) 
    }, [tagList]);

    const handleRemoval = (index) => {
        const newArray = [...tagList]
        newArray.splice(index, 1)
        setTagList(newArray)
    }

    const handleAddition = () => {
        if(tag) {
            setTagList((prev) => ([...prev, tag]));
        }
    }

    return (
        <div className='mt-3 flex flex-col gap-y-2'>
            <div className='flex gap-x-3'>
                {
                    tagList.map((item, index) => (
                        <p className='rounded-full bg-amber-800 py-2 px-2 flex gap-x-2 w-fit'>
                            {item}
                            <button type="button" onClick={() => handleRemoval(index)} className='cursor-pointer'>
                                -
                            </button>
                        </p>
                    ))
                }
            </div>
            <div className='flex flex-col gap-y-4'>
                <label htmlFor='tag'>Enter some tags here and add them!</label>
                <div className='flex justify-between'>
                     <input
                        id="tag"
                        type="text"
                        onChange={(e) => setTag(e.target.value)}
                        value={tag ?? ""}
                        className='bg-richblack-600 rounded-md w-9/10 py-2 px-3'
                        placeholder='Enter Tags here!'
                    />
                    <button type="button" className='cursor-pointer' onClick={handleAddition}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default TagSelection;
