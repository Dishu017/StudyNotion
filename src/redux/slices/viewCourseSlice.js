import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData: [],
    completedLectures: [],
    courseEntireData: null,
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            // console.log("Recieved Reducer:", action.payload);
            state.courseSectionData = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            console.log("state", action.payload, state?.completedLectures);
            state.completedLectures = [...state.completedLectures, action.payload]
        },
        setCourseEntireData: (state, action) => {
            // console.log("Reducer received:", action.payload);
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        }
    }
});

export const {
    setCourseSectionData,
    setCompletedLectures,
    updateCompletedLectures,
    setCourseEntireData,
    setTotalNoOfLectures
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;