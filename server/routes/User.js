const express = require("express");
const router = express.Router();

const {
    login,
    signUp,
    sendOtp,
    changePassword,
} = require("../controllers/Authorisation");

const { changePasswordInApp } = require("../controllers/Authorisation")
 
const {
    resetPasswordTokenGenerator,
    resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");

const { contactUs } = require("../controllers/ContactUs");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/sendotp", sendOtp);
router.post("/changePassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordTokenGenerator);
router.post("/reset-password", resetPassword);
router.post("/change-password-app", auth, changePasswordInApp);
router.post("/contactUs", contactUs);

module.exports = router;

//------------------
//Backend Complete!
//------------------