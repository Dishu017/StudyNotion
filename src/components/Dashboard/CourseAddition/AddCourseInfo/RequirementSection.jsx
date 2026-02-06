import React, { useState } from 'react'
import { useEffect } from 'react';


const RequirementSection = ({name, setValue, getValues, register}) => {

    const [requirement, setRequirement] = useState(null);
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true
        })
    });

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

    const handleRequirementAddition = () => {
        if(requirement) {
            setRequirementList((prev) => [...prev, requirement])
        }
    }

    const handleRemoval = (index) => {
        const newRequirementList = [...requirementList];
        newRequirementList.splice(index, 1)
        setRequirementList(newRequirementList);
    }

    return (
        <div>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor={name}>Instructions</label>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        id={name}
                        value={requirement ?? ""}
                        onChange={(e) => setRequirement(e.target.value)}
                        className='bg-richblack-600 rounded-md w-10/11 py-2 px-2'
                        placeholder='Enter Requirements here!'
                    /> 
                    <button type="button" className='cursor-pointer' onClick={handleRequirementAddition}>
                        Add
                    </button>
                </div>
           </div>
           <div className='mt-3'>
            {
                requirementList.map((item, index) => (
                    <p className='flex items-center gap-x-5'>
                        {item}
                        <button onClick={() => handleRemoval(index)} 
                        className='cursor-pointer text-richblack-600'>
                            clear
                        </button>
                    </p>
                ))
            }
           </div>
        </div>
    )
}

export default RequirementSection;
