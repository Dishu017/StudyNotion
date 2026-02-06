const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;

        if(!name || !description) {
            return res.status(401).json({
                success: false,
                message: "please fill all the field..."
            });
        }

        const ifCategoryPresent = await Category.findOne({name});
        if(ifCategoryPresent) {
            return res.status(401).json({
                success: false,
                message: "Category already present in the Database."
            });
        }

        const createdCategory = await Category.create({
            name,
            description,
        });

        return res.status(201).json({
            success: true,
            message: "Category created!"
        });

    }
    catch(error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "internal server error at CategoryCreation"
        });
    }
};

exports.showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, {_id: true, name: true, description: true});

        if(allCategory.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Category made yet!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "All categories found!",
            data: allCategory
        });

    }
    catch(error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "internal server error at showAllTags",
            error: error.message
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        const {categoryId} = req.body;
        //console.log("catId is", categoryId);
    
        const categorySpecificDocs = await Category.findById(categoryId)
                                    .populate({
                                        path: "courses",
                                        match: { status: "Published" },
                                        // populate: "ratingAndReviews",
                                    })
                                    .exec();

        if(!categorySpecificDocs) {
            return res.status(403).json({
                success: false,
                message: "No category found corresponding to the id"
            });
        }    
        
        const differentCourses = await Category.find({
                                _id: {$ne: categoryId}})
                                .populate("courses")
                                .exec();

        let topSellingCourses = await Course.aggregate([
            {
                $project: {
                    _id: 1,
                    courseName: 1,
                    price: 1,
                    thumbnail: 1,
                    ratingAndReviews: 1,
                    numberOfStudents: {$size: "$studentsEnrolled"}
                },
            }, 
            {
                $sort: {
                    numberOfStudents: -1
                }
            },
            {
                $limit: 8,
            }         
        ]);      
        
        topSellingCourses = await Course.populate(topSellingCourses, {
            path: "ratingAndReviews"
        })

        const latestCourse = await Course.find()
                                         .populate("ratingAndReviews")
                                         .sort({createdAt: -1})
                                         .limit(1);

        return res.status(200).json({
            success: true,
            message: "The courses are...",
            data: {
                categorySpecificDocs,
                differentCourses,
                topSellingCourses,
                latestCourse,
            },
        })                        
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
