const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const mongoose = require("mongoose");
const { Types } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

// exports.capturePayment = async (req, res) => {
//     try {
//         const {courseId} = req.body;
//         const userId = req.user.id;

//         if(!courseId) {
//             return res.status(400).json({
//                 success: false,
//                 error: error.message,
//                 message: "Please provide a valid course id",
//             });
//         }

//         let course;
//         try {
//             course = await Course.findById(courseId);
//             if (!course) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Course details not found!",
//                 })
//             }

//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success: false,
//                     message: "Student already enrolled!"
//                 })
//             }
//         }
//         catch(error) {
//             return res.status(401).json({
//                 success: false,
//                 error: error.message,
//                 message: "Error happened inside capturePayment!"
//             })
//         }

//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Date.now().toString(),
//             notes: {
//                 courseId,
//                 userId,
//             }
//         };

//         try {
//             const paymentDetails = await instance.orders.create(options);
//             console.log(paymentDetails);
//             return res.status(200).json({
//                 success: true,
//                 message: "Order created successfully!",
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentDetails.id,
//                 currency:paymentDetails.currency,
//                 amount:paymentDetails.amount,
//             });
//         }
//         catch(error) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Payment cannot be initiated!"
//             });
//         }

//     }
//     catch(error) {
//         return res.status(500).json({
//             success:false,
//             message:"Internal server error at capturePayment",
//         });
//     }
// };

// exports.verifySignature = async (req, res) => {
//     try {
//         const webhookSecret = "12345678";

//         const signature = req.headers["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(signature === digest) {
//             console.log("Payment is authorized");
//             const {
//                 courseId,
//                 userId,
//             } = req.body.payload.payment.entity.notes;

//             try {
//                 const courseEnrolled = await Course.findByIdAndUpdate(courseId, 
//                                                                     {
//                                                                         $push: {
//                                                                             studentEnrolled: userId,
//                                                                         }
//                                                                     },
//                                                                     {new: true}
//                 );

//                 const updatedUser = await User.findByIdAndUpdate(userId, 
//                                                                 {
//                                                                     $push: {
//                                                                         courses: courseId,
//                                                                     }
//                                                                 },
//                                                                 {new: true}
//                 );

//                 const mailDetails = await mailSender(updatedUser.email, 
//                                                     "Welcome to CodeHelp",
//                                                     "Congratulations, you are onboarded into new CodeHelp Course"
//                 );

//                 console.log(mailDetails);
//                 return res.status(200).json({
//                     success: true,
//                     message: "Student successfully enrolled!",
//                 });
//             }
//             catch(error) {
//                 return res.status(500).json({
//                 success:false,
//                 message:"Internal server error at enrollment",
//             });
//             }
//         }
//     }
//     catch(error) {
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Error at verifySignature controller...",
//         });
//     }
// };


exports.capturePayment = async (req, res) => {
    try {

        const { courses } = req.body;
        const userId = req.user.id;

        if(courses?.length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please select a valid course"
                }
            )
        }

        let totalAmount = 0;

        for(const course_id of courses) {

            let course;

            course = await Course.findById(course_id);
            if(!course) {
                return res.status(400).json(
                    {  
                        success:false, 
                        message:"Course Invalid!"
                    })
            }

            const uid = new Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "User already enrolled into course"
                })
            }
            totalAmount += course?.price;
        }

        const currency = "INR";
        const options = {
            amount: totalAmount * 100,
            currency,
            // reciept: crypto.randomUUID(),
        }

        try {
            const paymentResponse = await instance.orders.create(options);
            console.log("Response Payment", paymentResponse);
            return res.status(200).json({
                success: true,
                data: paymentResponse,
            })

        } catch(error) {
            console.log("Error at creating order", error);
        }

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success:false, 
            message:error.message
        });
    }
}

exports.verifyPayments = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body?.courses;
        const userId = req.user.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(200).json({
                success:false, 
                message:"Payment Failed"
            });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");


        if(expectedSignature === razorpay_signature) {
            await enrollStudents(courses, userId, res);
            return res.status(200).json({
                success: true,
                message: "Payment Verified Successfully!"
            }) 
        }

    } catch(error) {
        console.log(error);
    }
}

const enrollStudents = async (courses, userId, res) => {
    try {

        if(!courses || !userId) {
            return res.status(200).json({
                success: false,
                message: "Please send all the details..."
            })
        }

        for(const course_id of courses) {
            const updatedCourse = await Course.findOneAndUpdate(
                {_id:course_id},
                {$push: {studentsEnrolled: userId}},
                {new: true}
            )

            if(!updatedCourse) {
                return res.status(500).json({
                    success:false,
                    message:"Course not Found"
                });
            }

            const courseProgressInitial = {
                courseId: course_id,
                userId: userId,
                completedVideos: [],
            }

            const newCourseProgressDoc = CourseProgress.create(courseProgressInitial);

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: updatedCourse._id,
                        courseProgress: newCourseProgressDoc._id,
                    },
                },
                {new: true}
            );

            console.log("Courses", updatedUser.courses);

            const emailResponse = await mailSender(updatedUser.email, 
                                                courseEnrollmentEmail(updatedCourse.courseName, updatedUser.firstName),
                                               `Successfully Enrolled into the course ${updatedCourse.courseName}`,
                                                );
        }

    } catch(error) {
        console.log(error);
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try {
        const enrolledUser = await User.findById(userId);
        await mailSender(enrolledUser.email,
            paymentSuccessEmail(enrolledUser.firstName, amount, orderId, paymentId),
            `Payment Recieved Successfully!`
        )

    } catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}