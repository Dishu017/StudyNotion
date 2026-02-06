import { toast } from "react-toastify";
import { apiconnector } from "../apiconnector";
import { contactUs } from "../apis"

export function ContactUs(formData) {
    return async(dispatch) => {
        try {

            const response = await apiconnector("POST", contactUs.CONTACT_US, formData);
            
            if(!response.data.success) {
                throw new Error("Error in response.");
            }

            toast.success("Contact-us request submitted successfully!");
            return response.data;

        }
        catch(error) {
            console.log(error);
            toast.error("Error occured at contact-us");
        }
    }
};