import { apiconnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setUser } from "../../redux/slices/profileSlice"
import { toast } from "react-toastify";
import { setToken } from "../../redux/slices/authSlice";
import { resetCart } from "../../redux/slices/cartSlice";

export function sendOtp(email, navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST", endpoints.SENDOTP_API, { email });

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully!");
            navigate("/verify-email");
        }
        catch(error) {
            console.log(error);
            toast.error(error.message);
        }
        dispatch(setLoading(false));
    }
}

export function resetPasswordByToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            //console.log(email);
            const response = await apiconnector("POST", endpoints.RESETPASSTOKEN_API, { email });
            //console.log(email);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Mail Sent Successfully!");
            setEmailSent(true);
        }
        catch(error) {
            console.log(error);
            toast.error("Could not send Email, Please try again!");
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword = (newPassword, confirmPassword, token) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            //console.log(newPassword, confirmPassword);
            const response = await apiconnector("POST", endpoints.RESETPASSWORD_API, {
                newPassword, 
                confirmPassword, 
                token
            });

            //console.log("Response", response);

            if(!response.data.success) {
                throw new Error("Could not reset the Password");
            }

            toast.success(response.data.message);
        }
        catch(error) {
            console.log(error);
            toast.error(error.message);
        }
        dispatch(setLoading(false));
    }
};

export const signUp = (signUpData, otp, navigate) => {
    return async(dispatch, getState) => {
        dispatch(setLoading(true))
        try {
            const state = getState();
        
            const {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
            } = signUpData;

            const response = await apiconnector("POST", endpoints.SIGNUP_API, {
                                                                                firstName,
                                                                                lastName,
                                                                                email,
                                                                                password,
                                                                                confirmPassword,
                                                                                otp,
                                                                                accountType,
                                                                            });

            if(!response.data.success) {
                throw new Error(response.data.error);
            }

            toast.success("User Created Successfully!");
            navigate("/login");
            
            }
            catch(error) {
                toast.error(error.message);
                console.log(error);
                navigate("/signup");
            }
        dispatch(setLoading(false))
    }
}

export const login = (email, password, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST", endpoints.LOGIN_API, {
                email, 
                password,
            });

            console.log("Response", response);

            if(!response.data.success) {
                throw new Error("Error occured at Login");
            }

            const profileImage = response.data.checkIfUserExists.image ? 
                                 response.data.checkIfUserExists.image :
                                `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.checkIfUserExists.firstName} ${response.data.checkIfUserExists.lastName}`

            dispatch(setToken(response.data.token));
            dispatch(setUser({...response.data.checkIfUserExists, image: profileImage}));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.checkIfUserExists));

            toast.success("Logged In Successfully!");
            navigate("/dashboard");
        }
        catch(error) {
            console.log(error.message);
            toast.error(error.message);
        }
        dispatch(setLoading(false));
    }
};

export const logout = (navigate) => {
    return async(dispatch) => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/");
    };
}