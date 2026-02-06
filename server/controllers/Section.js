const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection = async (req, res) => {
    try {
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "please provide all the details"
            });
        }

        const createdSection = await Section.create({
            sectionName,
        });

        const updatedCourse = await Course.findByIdAndUpdate(courseId,
                                                            {
                                                                $push: {
                                                                    courseContent: createdSection._id,
                                                                }
                                                            },
                                                            {new: true}
                                                            )
                                                            .populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                    path: "subSectionData"
                                                                }
                                                            })
                                                            .exec();

        return res.status(200).json({
            success: true,
            message: "section created successfully!",
            data: updatedCourse
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "internal server error at createSection"
        });
    }
};

exports.updateSection = async (req, res) => {
    try {
        const {sectionName, sectionId, courseId} = req.body;

        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "provide all the details"
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                                {
                                                                    $set: {
                                                                        sectionName: sectionName,
                                                                    }
                                                                },
                                                                {new: true}
                                );

        const updatedCourse = await Course.findById(courseId).populate({
                                    path: "courseContent",
                                    populate: {
                                        path: "subSectionData"
                                    }
                                }).exec();

        return res.status(200).json({
            success: true,
            message: "section updated successfully!",
            data: updatedCourse
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "internal server error at updateSection"
        });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const {sectionId, courseId} = req.query;

        await Section.findByIdAndDelete(sectionId);

        const updatedDoc = await Course.findOneAndUpdate(
                            {_id: courseId },
                            {$pull: {
                                courseContent: sectionId,
                            }},
                            {new: true}
        );              

        const updatedCourse = await Course.findById(courseId).populate({
                                    path: "courseContent",
                                    populate: {
                                        path: "subSectionData"
                                    }
                                    }).exec();

        return res.status(200).json({
            success: true,
            message: "section deleted successfully",
            data: updatedCourse
        });
    }
    catch(error) {
        return res.status(500).json({
            success: true,
            message: "internal server error at deleteSection file",
            error: error.message, 
        });
    }
};