const ContactUs = require("../models/ContactUs");

exports.contactUs = async (req, res) => {
    try {
        
        const {
            firstName, 
            lastName, 
            email,
            message = "",
            phoneNumber = ""
        } = req.body;

        
        if(!firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                message: "Validation error occured"
            });
        }

        const createdContact = await ContactUs.create({
            firstName,
            lastName,
            message,
            email, 
            phoneNumber
        });

        return res.status(200).json({
            success: true,
            message: "Will reach you shortly! Hold on...",
            data: createdContact ? createdContact : "No data",
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error occured ISE",
            error: error,
        });
    }
};