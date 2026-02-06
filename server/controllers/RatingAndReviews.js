const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");


exports.createRatings = async (req, res) => {
    try {
        console.log("Req reached backend!");
        const userId = req.user.id;
        const {
            rating,
            review,
            courseId
        } = req.body;

        const courseDetails = await Course.findOne({_id: courseId,
                            studentsEnrolled: {
                                $elemMatch: {
                                    $eq: userId,
                                }
                            }
        });

        if(!courseDetails) {
            return res.status(401).json({
                success: false,
                message: "Course details not found!"
            });
        }

        const reviewPresent = await RatingAndReview.findOne({user: userId,
                                        course: courseId,
                                    }); 
        
        // if(reviewPresent) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Course is already reviewed by the user"
        //     });
        // }

        const RatingAndReviewCreated = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating, 
            review,
        });

        const updatedCourse = await Course.findByIdAndUpdate(courseId,
                                        {
                                            $push: {
                                                RatingAndReviews: RatingAndReviewCreated._id,
                                            }
                                        },
                                        {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully!",
            RatingAndReviewCreated,
        });

    }
    catch(error) {
        return res.status(500),json({
            success: false,
            message: error.message,
        })
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const {courseId} = req.body;
        // console.log("ID is", courseId);
        
        //Pipeline here each object a step in pipeline....
        const result = await RatingAndReview.aggregate([
            {
                //filters docs to send them further to the next stage
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                //averageRating is a created variable just like a local variable
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ]);

        if(result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        res.status(200).json({
            success: true,
            message: "No ratings exists! 0 rating"
        })
    }

    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        console.log("Reached here:")
        const allReviewsAndRatings = await RatingAndReview.find({})
                                    .sort({rating: -1})
                                    .populate({
                                        path: "user",
                                        select: "firstName lastName email image"
                                    })
                                    .populate({
                                        path: "course",
                                        select: "courseName"
                                    })
                                    .exec();
        
        return res.status(200).json({
            success: true,
            message: "All Reviews are -->",
            data: allReviewsAndRatings,
        });                            
                                    
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}