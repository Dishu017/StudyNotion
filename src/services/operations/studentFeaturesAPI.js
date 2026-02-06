import axios from "axios";
import { toast } from "react-toastify";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../redux/slices/cartSlice";
import { ratingsEndpoints, studentEndpoints } from "../apis";
import { setCourseReload, setPaymentLoading } from "../../redux/slices/courseSlice";
import { setUser } from "../../redux/slices/profileSlice";

const { COURSE_PAYMENT_API, 
        COURSE_VERIFY_PAYMENT, 
        SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

const loadscript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
            console.log("Done...")
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading");
    try {   
        const response = await loadscript("https://checkout.razorpay.com/v1/checkout.js");
        // console.log("Courses", courses);

        if(!response) {
            toast.error("razorpay SDK failed to load");
            console.log("Razorpay SDK failed to load");
            return;
        }

        const orderResponse = await axios.post(COURSE_PAYMENT_API, { courses }, { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Here");

        if(!orderResponse) {
            throw new Error("Order Could not be created at Razorpay");
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for purchasing this course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function(response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                verifyPayment({...response, courses}, token, navigate, dispatch);
                getUserDetailsUpdated(dispatch);
            },
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        });

    } catch(error) {
        console.log("Error inside buyCourse function in services...", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await axios.post(SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment(data, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true))
    try {
        const response = await axios.post(COURSE_VERIFY_PAYMENT, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, you are added to the course");
        dispatch(setCourseReload(true));
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setCourseReload(false));
    dispatch(setPaymentLoading(false))
}

export const getUserDetailsUpdated = async (dispatch) => {
    try {
        const response = await axios.get(GET_USER_DETAILS_API, {
            headers: `Bearer ${token}`
        });
        dispatch(setUser(response.data.data));

    } catch(error) {
        console.log(error);
        toast.error("Error in fetching user details...");
    }
}

export const createRatingAndReview = async (token, data) => {
    try {
        console.log("Inside services");
        console.log("Hitting URL", ratingsEndpoints.CREATE_RATING_AND_REVIEWS);
        const response = await axios.post(ratingsEndpoints.CREATE_RATING_AND_REVIEWS, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Response", response);
        if(!response?.data?.success) {
            throw new Error("Error inside the controller...")
        };

        toast.success("Review saved successfully");

    } catch(error) {
        console.log(error);
        toast.error("Error in creating user reviews in services");
    }
}