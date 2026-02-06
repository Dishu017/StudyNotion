const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const {imageUploadtoCloudinary} = require("../utils/cloudinary");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            price,
            category,
            whatYouWillLearn,
        } = req.body;
        
        const instructions = JSON.parse(req.body.instructions);
        const tags = JSON.parse(req.body.tags);

        const thumbnail = req.files.thumbnail;

        if(!courseName || !courseDescription || !price || !tags || !whatYouWillLearn) {
            return res.status(400).json({
                success: false,
                message: "Please send all the details"
            });
        }

        const userId = req.user.id;
        const checkIfUserExists = await User.findById(userId);
        if(!checkIfUserExists) {
            return res.status(400).json({
                success: false,
                message: "user doesn't exist please sign up first!",
            });
        }

        const validCategory = await Category.findById(category);
        if(!validCategory) {
            return res.status(403).json({
                success: false,
                message: "Invalid tag",
            });
        }

        const uploadedimage = await imageUploadtoCloudinary(thumbnail, process.env.FOLDER_CLOUDINARY);

        const courseCreated = await Course.create({
            courseName,
            courseDescription,
            price,
            category: validCategory._id,
            whatYouWillLearn,
            instructor: checkIfUserExists._id,
            thumbnail: uploadedimage?.secure_url,
            tags: tags,
            instructions,
        });

        const updatedUser = await User.findByIdAndUpdate(checkIfUserExists._id, 
                                                        {
                                                            $push: {
                                                                courses: courseCreated._id,
                                                            }
                                                        },
                                                        { new: true }
        );

        const updatedTags = await Category.findByIdAndUpdate(validCategory._id,
                                                        {
                                                            $push: {
                                                                courses: courseCreated._id,
                                                            }
                                                        },
                                                        { new: true },
        );

        return res.status(200).json({
            success: true,
            message: "Course created successfully!",
            data: courseCreated
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "error happened at createCourse... internal server error",
            error: error.message,
        })
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const getAllCourses = await Course.find({ status: "Published" }, 
                                                { 
                                                    courseName: true,
                                                    courseDescription: true,
                                                    price: true,
                                                    tags: true,
                                                    whatYouWillLearn: true,
                                                    instructor: true,
                                                })
                                                .populate("instructor")
                                                .exec();

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: getAllCourses,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "error happened at getCourses... internal server error",
            error: error.message,
        });
    }
};

exports.getCourseDetails = async (req,res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.findById(courseId)
                            .populate({
                                path: "instructor",
                                populate: {
                                    path: "additionalDetails",
                                }
                            })
                            .populate("category")
                            .populate("ratingAndReviews")
                            .populate({
                                path: "courseContent",
                                populate: {
                                    path: "subSectionData"
                                }
                            })
                            .exec();

        if(!courseDetails) {
            return res.status(401).json({
                success: false,
                message: "Course details not found!",
            });
        }       

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.map((section) => {
            section.subSectionData.map((subSection) => {
                let timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        }) 

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        
        return res.status(200).json({
            success: true,
            message: "Course details fetched and populated successfully!",
            data: {
                courseDetails,
                totalDuration,
            }
        });
    } catch(error) {
        return res.status(500).json({
                success: false,
                message: "Internal Server Error at getCourseDetails Controller...",
                error: error.message
            });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const updatedCourseDocument = await Course.findByIdAndUpdate(courseId, 
                                                                { $set: req.body },
                                                                { new: true }
                                                            );

        console.log("Here", updatedCourseDocument);                                                    

        if(!updatedCourseDocument) {
            return res.status(400).json({
                success: false,
                message: "Couldn't update the course as course not found with the given ID"
            });
        }

        const courseDetails = await Course.findOne({
                                      _id: courseId,
                                    })
                                      .populate({
                                        path: "instructor",
                                        populate: {
                                          path: "additionalDetails",
                                        },
                                      })
                                      .populate("category")
                                      .populate("ratingAndReviews")
                                      .populate({
                                        path: "courseContent",
                                        populate: {
                                          path: "subSectionData",
                                        },
                                      })
                                      .exec();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully!",
            data: courseDetails,
        });

    } catch(error) {
        return res.status(501).json({
            success: false,
            error: error.message,
            message: "Internal server error at updateCourse"
        });
    }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSectionData",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      // userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content?.subSection?.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    //console.log("course", courseDetails);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    return res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSectionData;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}