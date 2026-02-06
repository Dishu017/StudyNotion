const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const { imageUploadtoCloudinary } = require("../utils/cloudinary");
const { Types } = require("mongoose");

exports.createSubSection = async (req, res) => {
    try {
        const {
            sectionId,
            title,
            description,
            courseId,
        } = req.body;

        const video = req.files.videoFile;

        if(!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the details"
            });
        }

        const uploadedFileDetails = await imageUploadtoCloudinary(video, process.env.FOLDER_CLOUDINARY);
        
        const createdSubSection = await SubSection.create({
            title,
            timeDuration: uploadedFileDetails.duration,
            description,
            videoUrl: uploadedFileDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(
                                                            sectionId,
                                                            {
                                                                $push: {
                                                                    subSectionData: createdSubSection._id, 
                                                                }
                                                            },
                                                            {new: true}
                                                            )
                                                            .populate("subSectionData")
                                                            .exec();

        const updatedCourse = await Course.findById(courseId)
                                    .populate({
                                        path: "courseContent",
                                        populate: {
                                            path: "subSectionData"
                                        }
                                    }).exec()                                                
        
        return res.status(201).json({
            success: true,
            message: "Subsection created successfully",
            data: updatedCourse,  
        });
    }

    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error at createSubSection",
            error: error.message,
        });
    }
};

exports.getSubSectionData = async (req, res) => {
    try {
        const {
            subSectionId
        } = req.body

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection) {
            return res.status(401).json({
                success: false,
                message: "subsection not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subsection is found and sent!",
            data: subSection,
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error at get",
            error: error.message,
        })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const {
            subSectionId,  
            title, 
            description, 
            courseId
        } = req.body;

        //const video = req.files.videoFile;

        const subSectionData = await SubSection.findById(subSectionId);

        if(!subSectionData) {
            return res.status(403).json({
                success: false,
                message: "Please send correct subSection id...",
            });
        }

        if(title !== undefined) {
            subSectionData.title = title;
        }

        if(description !== undefined) {
            subSectionData.description = description;
        }
        
        if(req.files && req.files.videoFile !== undefined) {
            const video = req.files.video;
            const uploadedData = await imageUploadtoCloudinary(video, process.env.FOLDER_CLOUDINARY);
            subSectionData.videoUrl = uploadedData.secure_url;
            subSectionData.timeDuration = `${uploadedData.duration}`;
        }

        await subSectionData.save();

        const updatedCourse = await Course.findById(courseId)
                                    .populate({
                                        path: "courseContent",
                                        populate: {
                                            path: "subSectionData"
                                        }
                                    }).exec()          

        return res.status(200).json({
            success: true,
            message: "Changes have been made successfully!",
            data: updatedCourse,
        })
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error at updateSubSection",
            error: error.message,
        });
    }
};

exports.deleteSubSection = async (req, res) => {
    try {
        const {
            sectionId,
            subSectionId,
            courseId
        } = req.body;

        console.log(req.body);

        if(!sectionId || !subSectionId) {
            return res.status(403).json({
                success: false,
                message: "Provide all the details first!",
            });
        }

        await Section.findByIdAndUpdate(sectionId, 
                                        {
                                            $pull: {
                                                // subSectionData: new mongoose.Types.ObjectId(subSectionId),
                                                subSectionData: subSectionId,
                                            }
                                        });

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);  
        
        if(!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        const updatedCourse = await Course.findById(courseId)
                                    .populate({
                                        path: "courseContent",
                                        populate: {
                                            path: "subSectionData"
                                        }
                                    }).exec()

        return res.status(200).json({
            success: true,
            message: "Requested Subsection deleted successfully...",
            data: updatedCourse,
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error at deleteSubSection...",
            error: error.message
        })
    }
};