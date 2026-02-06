import axios from "axios";
import { toast } from "react-toastify";
import { courseEndpoints } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { setSectionData, setStep } from "../../redux/slices/courseSlice";

export const createCourse = async (token, formdata) => {
    let response = null; 
    const toastId = toast.loading("Loading...");
    try {
        console.log("Hello");
        response = await axios.post(courseEndpoints.CREATE_COURSE_API, formdata,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

        console.log(response);
        
        if(!response.data.success) {
            throw new Error("Error happended at creating course");
        }

        toast.success("Course Info added successfully!");
        console.log(response.data);
        // toast.dismiss(toastId);
    }
    catch(error) {
        console.log("Couldn't create the course at createCourse", error);
        toast.error(error.message, "Error");
        // toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
    return response.data;
}

export const updateCourse = async (token, data) => {
    let response;
    const toastId = toast.loading("Loading...");
    console.log("data", data.courseId);
    try {
        response = await axios.patch(courseEndpoints.UPDATE_COURSE_API, data,
                        {
                             headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
        );

        if(!response.data.success) {
            throw new Error("Error in patch updateCourse");
        }

        console.log("response", response)

        toast.success("Patch updated successfully");
        console.log("Patch update successful");

    } catch(error) {
        console.log("Couldn't update the course, Error inside connecting function");
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response?.data?.data;
}

export const createSection = async (data, token) => {
    let response;
    const toastId = toast.loading("Loading...")
    try {
        console.log("data", data)
        response = await axios.post(courseEndpoints.CREATE_SECTION_API, data, 
                    {
                       headers: {
                            Authorization: `Bearer ${token}`
                       }
                    }
        );

        if(!response?.data?.success) {
            throw new Error("Success has been equated to false");
        }

        toast.success("Section created successfully!");
        console.log("Section created", response.data.data);


    }
    catch(error) {
        console.log("Error occured in the services function");
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response.data?.data;
}

export const updateSection = async (token, data) => {
    const toastId = toast.loading("Loading...");
    let response;
    try {
        response = await axios.post(courseEndpoints.UPDATE_SECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response?.data?.success) {
            throw new Error("Couldn't update the course");
        }

        console.log("Section updated successfully!");
        console.log(response.data);
        toast.success("Section updated successfully!");
    }
    catch(error) {
        toast.error("Error occured at updateSection service");
        console.log(error.message);
    }
    toast.dismiss(toastId);
    return response.data.data ?? response.data;
}

export const createSubsection = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let response;
    try {
        response = await axios.post(courseEndpoints.CREATE_SUBSECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.data.success) {
            throw new Error("Error occured at createSubsection services");
        }

        console.log("Subsection created successfully");
        toast.success("Subsection created successfully");

    }  
    catch(error) {
        console.log("Error occured at createSubsection", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return response?.data?.data;
}

export const deleteSection = async (token, data) => {
    const toastId = toast.loading("Loading...");
    let response;
    try {
        response = await axios.delete(courseEndpoints.DELETE_SECTION_API, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                sectionId: data.sectionId,
                courseId: data.courseId,
            }
        });

        if(!response.data.success) {
            throw new Error("Could not delete the section at services");
        }

        toast.success("Section deleted successfully");
        console.log("section deleted!");
    }
    catch(error) {
        console.log("Error occured at deleteSection", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response.data.data;
}

export const updateSubSection = async (token, data) => {
    let response;
    const toastId = toast.loading("Loading...");
    try {
        response = await axios.post(courseEndpoints.UPDATE_SUBSECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.data.success) {
            throw new Error("Error occured while creating a call for subsection updation")
        }

        console.log("Subsection updated successfully");
        toast.success("Subsection updated successfully");
    }
    catch(error) {
        console.log("Error occured at services updateSubSection");
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response.data.data;
}

export const deleteSubSection = async (token, data) => {
    let response;
    const toastId = toast.loading("Loading...");
    try {
        response = await axios.post(courseEndpoints.DELETE_SUBSECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.data.success) {
            throw new Error("Error occured while creating a call for subsection updation")
        }

        console.log("Subsection deleted successfully");
        toast.success("Subsection deleted successfully");
    }
    catch(error) {
        console.log("Error occured at services deletion");
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response.data.data;
}

export const getSubSectionData = async (data) => {
    let response;
    const toastId = toast.loading("Loading...");
    console.log("data", data)
    try {
        response = await axios.post(courseEndpoints.GET_SUBSECTION_API, data);
        console.log("res", response.data);

        if(!response.data.success) {
            throw new Error("Error occured while creating a call for subsection get")
        }

        console.log("Subsection gotten successfully");
        toast.success("Subsection gotten successfully");
    }
    catch(error) {
        console.log("Error occured at services get");
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response.data?.data;
}

export const fetchAllInstructorCourses = async (token) => {
    let response;
    const toastId = toast.loading("Loading...")
    try {
        response = await axios.get(courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response?.data?.success) {
            throw new Error("Couldn't fetch the course... Please try again later");
        }

        console.log(response.data);
        toast.success("Courses fetched successfully");
    }
    catch(error) {
        console.log(error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response?.data?.data;
}

export const getCompleteCourseDetails = async (token, data) => {
    let response;
    const toastId = toast.loading("Loading...");
    try {
        // console.log("Data", data);
        response = await axios.post(courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(!response?.data?.success) {
            throw new Error("Couldn't fetch the course completely... Please try again later");
        }

        // console.log("Data fetched is -->", response?.data?.data?.courseDetails);
        toast.success("Course details fetched successfully");
    }
    catch(error) {
        console.log(error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return response?.data?.data?.courseDetails;
}

export const deleteCourse = async (data) => {
    let response;
    const toastId = toast.loading("Loading...");
    try {
        response = await axios.post(courseEndpoints.DELETE_COURSE_API, data);

        if(!response?.data?.success) {
            throw new Error("Couldn't delete the course... Please try again later");
        }     
        
        console.log(response?.data);
        toast.success("Course details deleted successfully");
    }
    catch(error) {
        console.log(error);
        toast.error(toast.error);
    }
    toast.dismiss(toastId);
    return response;
}

export const getCourseDetails = async (data) => {
    let response;
    const toastId = toast.loading("Loading...");
    try {
        response = await axios.post(courseEndpoints.COURSE_DETAILS_API, data);
        if(!response?.data?.success) {
            throw new Error("Couldn't fetch the course... Please try again later");
        } 
        console.log(response?.data);
        toast.success("Course details fetched successfully");

    } catch(error) {
        console.log(error);
        toast.error(toast.error);
    }
    toast.dismiss(toastId);
    return response?.data?.data?.courseDetails;
}