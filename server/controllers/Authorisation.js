const User = require("../models/User");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

exports.sendOtp = async (req, res) => {
    try {
        const { 
            email 
        } = req.body;
    
        let otpGenerated = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            digits: true,
        });
    
        let ifOTPExists = await OTP.find({otp: otpGenerated});
    
        while(ifOTPExists.length > 0) {
            otpGenerated = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
                digits: true,
            });
    
            ifOTPExists = await OTP.find({otp: otpGenerated});
        }
    
        const payLoadForOtp = {
            email: email,
            otp: otpGenerated,
        };
    
        const otpDoc = await OTP.create(payLoadForOtp);
        
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

        console.log("Hit successfully!");
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error at sendOtp",
            data: error.message,
        });
    }
};

exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            accountType,
        } = req.body;

        //console.log("here1");
    
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(401).json({
                success: false,
                message: "Please enter all the fields!"
            });
        }
    
        if(password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Passwords do not match, please enter matching password"
            });
        }
       // console.log("here2");

    
        const ifUserExists = await User.findOne({email});
        if(ifUserExists) {
            return res.status(401).json({
                success: false,
                message: "Please login! You are already a user."
            });
        }
    
        const otpDocument = await OTP.findOne({email}).sort({createdAt: -1});
    
        if(!otpDocument || otp !== otpDocument.otp) {
            return res.status(401).json({
                success: false,
                message: "Invalid otp, Please redo the process",
            });
        }
    
        const ProfileEntry = {
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        };
    
        const profileDoc = await Profile.create(ProfileEntry);
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const savedNewUser = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDoc._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`
        });    
        
        //console.log(savedNewUser);
        
        return res.status(201).json({
            success: true,
            message: "user created in database",
            data: savedNewUser,
        });
    }

    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error at signUp",
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const checkIfUserExists = await User.findOne({email}).populate("additionalDetails").exec();

        if(!checkIfUserExists) {
            return res.status(401).json({
                success: false,
                message: "Please signUp first",
            });
        }

        const payload = {
            email,
            id: checkIfUserExists._id,
            role: checkIfUserExists.accountType,
        };
        
        if(await bcrypt.compare(password, checkIfUserExists.password)) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "3d",
            });
            checkIfUserExists.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Logged in successfully!",
                checkIfUserExists,
                token,
            });
        }

        else {
            return res.status(401).json({
                success: false,
                message: "password incorrect",
            })
        }
    }

    catch(error) {
        return res.status(501).json({
            success: false,
            message: "internal server error at login!",
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const {
            oldPassword,
            newPassword,
            confirmNewPassword,
        } = req.body;

        const userDocument = await User.findById(req.user.id);

        if(!userDocument) {
            return res.status(401).json({
                success: false,
                message: "Could not locate the user!"
            });
        }

        if(newPassword !== confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const verifyPassword = await bcrypt.compare(oldPassword, userDocument.password);

        if(!verifyPassword) {
            return res.status(401).json({
                success: false,
                message: "Please enter correct password..."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // userDocument.password = hashedPassword;
        // await userDocument.save();

        await User.findByIdAndUpdate(req.user.id, 
                                    {
                                        $set: {
                                            password: hashedPassword,
                                        }
                                    },
                                    {
                                        new: true,
                                    });

        //sending notification email -->
        try {
            const mailData = await mailSender(userDocument.email,
                             passwordUpdated(userDocument.email, `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`));

            console.log("Mail response is:", mailData.response);                 
        }             
        catch(error) {
            console.log("Error in sending email");
            return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }              
            
        return res.status(200).json({
            success: true,
            message: "Password changed successful",
        })
        
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occured at changePassword fn internal server error...."
        })
    }
}

exports.changePasswordInApp = async (req, res) => {
    try {
        const {
            password,
            confirmPassword
        } = req.body;

        const id = req.user.id;

        const userData = await User.findById(id);

        if(!userData) {
            return res.status(401).json({
                success: false,
                message: "No user found in the records"
            });
        }

        if(password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password don't match! Enter matching passwords"
            });
        }

        userData.password = await bcrypt.hash(password, 10);
        await userData.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal Server Error at changePasswordInApp"
        })
    }
}