const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorData,
} = require("../controllers/Profile");

router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.post("/updateDisplayPicture", auth, updateDisplayPicture);
router.delete("/deleteAccount", auth, deleteAccount);
router.post("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getInstructorDashboardData", auth, isInstructor, instructorData);

module.exports = router;