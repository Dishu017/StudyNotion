const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
});

async function SendOTPEmail(email, otp) {
    try {
        const result = await mailSender(email, otpTemplate(otp), "Verification Email");
        console.log(result);
    }
    catch(error) {
        console.log("Error occured while sending mail!", error);
    }
};

OTPSchema.pre("save", async function(next) {
    await SendOTPEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);