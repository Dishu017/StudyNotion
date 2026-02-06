const CourseProgress = require("../models/CourseProgress");

exports.markLectureAsCompleted = async (req, res) => {
    try {
        const { courseId, sectionId, subSectionId } = req.body;
        const id = req.user.id;
        if(!courseId || !subSectionId) {
            return res.status(403).json({
                success: false,
                message: "Error all the details first to finish checks..."
            });
        }
        const progressDoc = await CourseProgress.findOne(
            { courseId: courseId },
        );

        // if(!progressDoc) {
        //     await CourseProgress.create({
        //         courseId,
        //         userId: id,
        //         completedVideos: [],
        //     });
        // }

        if(progressDoc.completedVideos.includes(subSectionId)){
            return res.status(200).json({
                success: true,
                message: 'Video already marked completed',
                data: progressDoc,
            });
        } else {
            progressDoc.completedVideos.push(subSectionId);
            progressDoc.save();
        }

        if(!progressDoc) {
            return res.status(403).json({
                success: false,
                message: 'Document not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Video Marked as complete',
            data: progressDoc,
        });

    } catch(error) {
        console.log("Could not mark lecture as complete...", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.fetchCompletedLecturesData = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        const courseProgressDoc = await CourseProgress.findOne(
            {courseId: courseId}
        );

        if(!courseProgressDoc) {
            return res.status.json({
                success: false,
                message: 'Courseprogress Not found',
            })
        }
        return res.status(200).json({
            success: true,
            message: "Details fetched successfully",
            data: courseProgressDoc,
        })
    } catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}