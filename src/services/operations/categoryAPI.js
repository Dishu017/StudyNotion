import axios from "axios"
import { categories, courseEndpoints, ratingsEndpoints, catalogData } from "../apis"
import { toast } from "react-toastify";

export const getCategory = async () => {
    try {
        const response = await axios.get(courseEndpoints.COURSE_CATEGORIES_API);
        if(!response.data.success) {
            throw new Error("Error in getting data from categories API");
        }
        return response.data.data;
    }
    catch(error) {
        console.log("Error in fetching categories data");
        console.log(error.message);
        toast.error("Error in fetching categories data");
        alert("Categories not found");
    }
} 

export const getAllCategory = async () => {
    try {
        const response = await axios.get(categories.CATEGORIES_API);
        if(!response.data.success) {
            throw new Error("Couldn't fetch courses");
        }
        // console.log("Response-Category", response);
        return response.data.data;

    } catch(error) {
        console.log(error);
        toast.error("Error fetching categories inside getAllCategory") 
    }
}

export const getCategoryPageDetails = async (data) => {
    try {
        // console.log("Id is:", data);
        const response = await axios.post(catalogData.CATALOGPAGEDATA_API, data);
        
        console.log("Response-Catelog", response);
        if(!response.data.success) {
            throw new Error("Couldn't fetch courses");
        }
    
        return response.data.data;

    } catch(error) {
        console.log(error);
        toast.error("Error fetching details inside getCategoryPageDetails");
    }
}

export const getAverageRatings = async (data) => {
    try {
        // console.log("Data is here", data);
        const response = await axios.post(ratingsEndpoints.GET_AVERAGERATINGS_API, data);

        // console.log("Average Ratings", response);
        if(!response.data.success) {
            throw new Error("Couldn't fetch average rating");
        }
        return response.data.averageRating;

    } catch(error) {
        console.log(error);
        toast.error("Error in Ratings", error.message);
    }
}