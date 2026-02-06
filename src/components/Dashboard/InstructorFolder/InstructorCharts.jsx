import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorCharts = ({courses}) => {

    const [toDisplay, setToDisplay] = useState("student");

    function getRandomColors(number) {
        const colorArray = [];
        for(let i = 0; i < number; i++) {
            const colorFunction = `rgb(${Math.floor(Math.random() * 256)}, 
                                        ${Math.floor(Math.random() * 256)}, 
                                        ${Math.floor(Math.random() * 256)}
                                    )`;
            colorArray.push(colorFunction);                       
        }
        return colorArray;
    }

    const dataSetForStudentsEnrolled = {
        labels: courses.map((course, index) => (course.name)),
        datasets: [
            {
                label: 'Enrolled Students data',
                data: courses.map((course, index) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ] 
    };

    const dataSetForIncomeGenerated = {
        labels: courses.map((course, index) => (course.name)),
        datasets: [
            {
                label: 'Income Generated data',
                data: courses.map((course, index) => course.totalAmountEarned),
                backgroundColor: getRandomColors(courses.length),
            }
        ] 
    };

    console.log('colors', getRandomColors(3))

    return (
        <div className='flex flex-col gap-y-5 items-center h-[400px] rounded-md 
        bg-richblack-700/50 py-5'>
            <div className='flex gap-x-3.5'>
                <div className={`${toDisplay === 'student' ? 
                "bg-amber-300 text-richblack-800": 
                "bg-richblack-700 text-richblack-100"} px-3 py-2 rounded-md cursor-pointer`}
                onClick={() => setToDisplay("student")}>
                    Students Enrolled
                </div>
                <div className={`${toDisplay === 'income' ? 
                "bg-amber-300 text-richblack-800": 
                "bg-richblack-700 text-richblack-100"} px-3 py-2 rounded-md cursor-pointer`}
                onClick={() => setToDisplay("income")}>
                    Income Generated
                </div>
            </div>
            <div>
                <Pie data={toDisplay === 'student' ? dataSetForStudentsEnrolled: dataSetForIncomeGenerated}/>
            </div>
        </div>
    )
}

export default InstructorCharts;
