const express = require("express");
const router = express.Router();

const {
    capturePayment,
    verifyPayments,
    sendPaymentSuccessEmail
} = require("../controllers/Payments");

const {
    auth,
    isStudent,
    isAdmin,
    isInstructor
} = require("../middlewares/auth");

router.post("/capturePayment", auth, capturePayment);
router.post("/verifyPayments", auth, verifyPayments);
router.post("/paymentSuccessEmail", auth, sendPaymentSuccessEmail);

module.exports = router;