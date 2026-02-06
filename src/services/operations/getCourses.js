import { toast } from "react-toastify";
import axios from "axios";
import { courseEndpoints, ratingsEndpoints, instructorEndpoint } from "../apis";
import { updateCompletedLectures } from "../../redux/slices/viewCourseSlice";

export const getCoursesData = (token, setEnrolledCourses) => {
    return async(dispatch) => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/profile/getEnrolledCourses", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Data is -->", response.data?.data);

            if(!response.data.success) {
                throw new Error("Error in getting data");
            }

            setEnrolledCourses(response.data.data);
            toast.success("Course details fetched successfully!");
        }
        catch(error) {
            console.log(error);
            toast.error(error.message);
        }
    }
}

export const markAsComplete = async (data, dispatch, token) => {
    const toastId = toast.loading("Loading..."); ;
    try {   
        const response = await axios.post(courseEndpoints?.MARK_AS_COMPLETED, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('response', response);

        if(!response?.data?.success) {
            throw new Error("Error occured at markascomplete");
        }

        if(response?.data?.success) {
            // console.log("Incoming Data", data?.subSectionId, state.updatedLectures);
            dispatch(updateCompletedLectures(data?.subSectionId))
        }

        toast.success("Marked as completed");
        return response?.data?.data;

    } catch(error) {
        console.log(error);
        toast.error(error);

    } finally {
        toast.dismiss(toastId);
    }
}

export const fetchCompletedSubSection = async (token, data) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(courseEndpoints.FETCH_MARK_COMP_LECTURES, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        //console.log("response required", response?.data?.data);

        if(!response?.data?.success) {
            throw new Error("Error in fetching data");
        }

        toast.success("fetched completed lectures data");
        return response?.data?.data;

    } catch(error) {
        console.log(error);
        toast.error("Fetch Prcess failed");

    } finally {
        toast.dismiss(toastId);
    }
}

export const getAllReviews = async () => {
    const toastId = toast.loading("Loading");
    try {
        // console.log("Here");
        // console.log("URL", ratingsEndpoints.GET_REVIEWS_ALL);
        const response = await axios.get(ratingsEndpoints.GET_REVIEWS_ALL);
        // console.log("Response -->", response);
        if(!response?.data?.success) {
            throw new Error("Error in fetching reviews");
        }
        toast.success("Reviews Fetched");
        return response?.data?.data;
    } catch(error) {
        console.log("Error fetching reviews", error);
    } finally {
        toast.dismiss(toastId);
    }
}

export const getInstructorDashboardDataset = async (token) => {
    const toastId = toast.loading("Loading");
    try {   
        const response = await axios.get(instructorEndpoint.GET_INSTRUCTOR_DASHBOARD_DATA, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(!response?.data?.success) {
            throw new Error("Error in fetching iData");
        }
        console.log("Response", response);
        return response?.data?.data;
    } catch(error) {
        console.log("Error fetching instructor data", error);
    } finally {
        toast.dismiss(toastId);
    }
};