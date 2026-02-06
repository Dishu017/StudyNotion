const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    phoneNumber: {
        type: String,
    }
});

const ContactUs = mongoose.model("ContactUs", contactSchema);
module.exports = ContactUs;