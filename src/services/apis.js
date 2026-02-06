const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategory",   
};

export const endpoints = {
    SENDOTP_API: BASE_URL + "/user/sendotp",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/user/reset-password"
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES: BASE_URL + "/profile/getEnrolledCourses"
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_PAYMENT: BASE_URL + "/payment/verifyPayments",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/paymentSuccessEmail"
}

export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    UPDATE_COURSE_API: BASE_URL + "/course/updateCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategory",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    GET_SUBSECTION_API: BASE_URL + "/course/getSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    MARK_AS_COMPLETED: BASE_URL + "/course/markAsCompleted",
    FETCH_MARK_COMP_LECTURES: BASE_URL + "/course/fetchCompletedlecturesData"
}

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
  GET_AVERAGERATINGS_API: BASE_URL + "/course/getAverageRating",
  CREATE_RATING_AND_REVIEWS: BASE_URL + "/course/createRatingsAndReview",
  GET_REVIEWS_ALL: BASE_URL + "/course/getAllRatingsAndReviews"
}

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/user/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
}

export const contactUs = {
  CONTACT_US: BASE_URL + "/user/contactUs", 
}

export const payments = {
  PAYMENT_SUCCESS_EMAIL: BASE_URL + "/payment/paymentSuccessEmail"
}

export const instructorEndpoint = {
  GET_INSTRUCTOR_DASHBOARD_DATA: BASE_URL + '/profile/getInstructorDashboardData'
}