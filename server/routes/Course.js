const express = require("express");
const router = express.Router();

//importing all the things
const {
    auth,
    isInstructor,
    isStudent,
    isAdmin
} = require("../middlewares/auth");

const {
    createCourse,
    getCourseDetails,
    updateCourse,
    getAllCourses,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse,
} = require("../controllers/Course");

const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
    getSubSectionData
} = require("../controllers/SubSection");

const {
    createCategory,
    showAllCategory,
    categoryPageDetails,
} = require("../controllers/Category");

const {
    createRatings,
    getAverageRating,
    getAllReviews
} = require("../controllers/RatingAndReviews");

const { markLectureAsCompleted, 
    fetchCompletedLecturesData } = require("../controllers/CourseProgress");

//**************************************************************************
//                          Course Routes
//**************************************************************************

//creating a course by instructor only
router.post("/createCourse", auth, isInstructor, createCourse);

//updating the created course
router.patch("/updateCourse", auth, isInstructor, updateCourse);

//creating a section
router.post("/addSection", auth, isInstructor, createSection);

//updating a section
router.post("/updateSection", auth, isInstructor, updateSection);

//delete a section
router.delete("/deleteSection", auth, isInstructor, deleteSection);

//adding a subsection to a section
router.post("/createSubSection", auth, isInstructor, createSubSection);

//updating a subSection
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

//deleteSubSection
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

//get all registered courses
router.get("/getAllCourses", getAllCourses);

//get details for a specific course
router.post("/getCourseDetails", getCourseDetails);

router.post("/getSubSection", getSubSectionData);

//Newly added controllers -->
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

router.post("/deleteCourse", deleteCourse);

//**************************************************************************
//                          Category Routes
//**************************************************************************

//In this project Category can be created by admin only
//Create Category here
router.post("/createCategory", auth, isAdmin, createCategory);

//get all categories
router.get("/showAllCategory", showAllCategory);

//get category page details
router.post("/getCategoryPageDetails", categoryPageDetails);


//**************************************************************************
//                      RatingAndReviews Routes
//**************************************************************************

//creating rating and writing review
router.post("/createRatingsAndReview", auth, isStudent, createRatings);

//get average ratings
router.post("/getAverageRating", getAverageRating);

//get all ratings and reviews
router.get("/getAllRatingsAndReviews", getAllReviews);

//mark video as complete
router.post('/markAsCompleted', auth, markLectureAsCompleted);
router.post('/fetchCompletedlecturesData', auth, fetchCompletedLecturesData);

module.exports = router;