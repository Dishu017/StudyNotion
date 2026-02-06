import { toast } from "react-toastify";
import { setLoading, setUser } from "../../redux/slices/profileSlice"
import { apiconnector } from "../apiconnector";
import { settingsEndpoints, profileEndpoints } from "../apis";
import axios from "axios";
import { logout } from "./authAPIConnect";

export const updateProfileImage = (token, formData) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            //console.log(token);
            const response = await axios.post(
                                        settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, 
                                        formData, 
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                            withCredentials: true, // optional (needed only if using cookies)
                                        });

            if(!response.data.success) {
                throw new Error("Couldn't upload image please try again later!");
            }

            toast.success("File upload successful!");

        } catch(error) {
            console.log("Error occured at updateProfileImage", error);
            toast.error(error.message)
        }
        dispatch(setLoading(false))
    }
}

export const uploadPersonalData = (token, formData, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post(
                                    settingsEndpoints.UPDATE_PROFILE_API, 
                                    formData,
                                    {
                                        headers: { 
                                            Authorization: `Bearer ${token}`
                                        }
                                    }
            );

            let userResponse = null;
            let user = null;

            if(response.data.success) {
                userResponse = await axios.get(profileEndpoints.GET_USER_DETAILS_API, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            });
                console.log(userResponse);                            

                localStorage.setItem("user", JSON.stringify(userResponse.data.data));
                user = userResponse.data?.data;                           
            }
            // console.log(user);

            dispatch(setUser(user));
            // console.log(response, userResponse);

            if(!response.data.success) {
                throw new Error("Error uploading details! Please try again after a while");
            }

            console.log("Upload Successful");
            toast.success("Upload Successful");
            navigate("/dashboard"); 

        }
        catch(error) {
            console.log(error.message);
            toast.error(error.message);
        }
        dispatch(setLoading(false));
    }
}

export const changePasswordInApp = (token, formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/change-password-app",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            if(!response.data.success) {
                throw new Error("Error in updating password");
            }
            toast.success("Password changed successfully! Login again to continue");
            dispatch(logout(navigate));
        }
        catch(error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
};

export const deleteUser = (token, navigate) => {
    return async(dispatch) => {
        try {
            const response = await axios.delete(settingsEndpoints.DELETE_PROFILE_API,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            ); 

            if(!response.data.success) {
                throw new Error("Couldn't delete user! Please try again later!");
            }

            dispatch(logout(navigate));
        }
        catch(error) {
            console.log("Couldn't delete User");
            toast.error("Error deleting user");
        }
    }
};