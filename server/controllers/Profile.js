const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {imageUploadtoCloudinary} = require("../utils/cloudinary");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

exports.createProfile = async (req, res) => {
    try{
        const {
            dateOfBirth="",
            about="",
            contactNumber,
            gender
        } = req.body;

        const id = req.user.id;

        if(!contactNumber || !gender) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
                error: error.message,
            })
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            error: error.message,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {

        const id = req.user.id;

        const userDetails = await User.findById(id);
        if(!userDetails) {
            res.status(200).json({
                success: false,
                message: "User not found"
            });
        }

        const profileId = userDetails.additionalDetails;

        await Course.updateMany(
                                {studentEnrolled: id},
                                {$pull: {
                                    studentEnrolled: id,
                                }}
        );

        await Profile.findByIdAndDelete(profileId);

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully!"
        });
    }

    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error at deleteAccount",
        });
    }
};

exports.getAllUserDetails = async(req,res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id)
                            .populate("additionalDetails")
                            .populate({
                                path: "courses",
                                populate: {
                                    path: "courseContent",
                                    populate: {
                                        path: "subSectionData"
                                    }
                                }
                            })
                            .populate("courseProgress")
                            .exec();

        if(!userDetails) {
            return res.status(403).json({
                success: false,
                message: "User details not found!"
            });
        }                    

        // 

        return res.status(200).json({
            success: true,
            message: "User-Details fetched successfully",
            data: userDetails
        });

    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Error occured while fetching details of User...",
        })
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        const image = req.files?.profileImage;
        const userId = req.user.id;

        if (!req.files) {
            return res.status(400).json({ success: false, message: "No file received" });
        }

        console.log("Request", req.files)

        if(!image || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details",
            })
        }

        const uploadedJsonImage = await imageUploadtoCloudinary(image, process.env.FOLDER_CLOUDINARY, 1000, 1000);
        console.log(uploadedJsonImage);

        const updatedUser = await User.findByIdAndUpdate(userId, 
                                    {$set: {image: uploadedJsonImage.secure_url}},
                                    {new: true});

        return res.status(200).json({
                success: true,
                message: "Image uploaded successfully",
                data: updatedUser
        });                          
    }
    catch(error) {
        return res.status(500).json({
                success: false,
                message: "Error happened inside uploadProfileImage",
                data: error.message
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({_id: userId})
                                .populate({
                                    path: "courses",
                                    populate: {
                                        path: "courseContent",
                                        populate: {
                                            path: "subSectionData"
                                        }
                                    }
                                })
                                .exec();

        // console.log("user-->164", userCourseData.courses);
        // // console.log("165");

        if(!userDetails) {
            return res.status(403).json({
                success: false,
                message: "Please enter correct user data..."
            });
        }    

        let subSectionLength = 0;
        userDetails = userDetails.toObject();
        for(let i = 0; i < userDetails?.courses.length; i++) {
            let totalDurationInSeconds = 0;
            let readAbleFormat = null;
            for(let j = 0; j < userDetails?.courses[i]?.courseContent.length; j++) {
                totalDurationInSeconds += userDetails?.courses[i]?.courseContent[j]?.subSectionData
                                        .reduce((acc, lecture) => (acc + parseInt(lecture?.timeDuration)), 0); 
                // console.log("Total", parseInt(userDetails?.courses[i]?.courseContent[j]?.subSectionData[0]?.timeDuration));                          
                subSectionLength += userDetails?.courses[i]?.courseContent[j]?.subSectionData.length;                                             
            }
            readAbleFormat = convertSecondsToDuration(totalDurationInSeconds);
            //console.log('Format' , readAbleFormat);
            userDetails.courses[i].lectureTotalDuration = readAbleFormat; 
                
            const courseProgress = await CourseProgress.findOne({
                courseId: userDetails?.courses[i]._id,
                userId: userId,
            });
            const completeLectureCourses = courseProgress?.completedVideos.length; 
            if (subSectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            }  else {
                const multiplier = Math.pow(10, 2);
                // console.log("Here is", completeLectureCourses, subSectionLength);
                userDetails.courses[i].progressPercentage = Math.round(((completeLectureCourses / subSectionLength) * 100) * multiplier) / multiplier;
            } 
        };
        
        return res.status(200).json({
            success: true,
            message: "Data of courses has been fetched successfully!",
            data: userDetails.courses,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error happened inside getEnrolledCourses",
            error: error.message,
        });
    }
}

exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber, gender = "" } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
        profile.gender = gender;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
        
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.instructorData = async (req, res) => {
    try {
        const courseDetails = await Course.find({
            instructor: req.user.id,
            studentsEnrolled: { $ne: []}
        });
        const instructorDashboardDataArray = courseDetails.map((course, index) => {
            const totalAmountEarned = course?.price * course?.studentsEnrolled?.length;
            const totalStudentsEnrolled = course?.studentsEnrolled?.length;

            const instructorDashboardData = {
                courseId: course?._id,
                totalAmountEarned,
                totalStudentsEnrolled,
                description: course?.courseDescription,
                name: course?.courseName,
                thumbnail: course?.thumbnail,
                price: course?.price,
            }
            return instructorDashboardData;
        })
        return res.status(200).json({
            success: true,
            data: instructorDashboardDataArray,
            message: 'Dashboard data fetched successfully',
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};
