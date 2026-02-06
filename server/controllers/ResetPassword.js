const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordTokenGenerator = async (req, res) => {
    try {
        //console.log("request body is ->", req.body);
        const { 
            email 
        } = req.body;

        const checkIfUserExists = await User.findOne({email});
        if(!checkIfUserExists) {
            return res.status(401).json({
                success: false,
                message: "User does not exist!"
            });
        }

        const token =  crypto.randomUUID();

        const updatedUser = await User.findOneAndUpdate({email: email},
                                                        {$set: {
                                                            token: token,
                                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                                        }},
                                                        {new: true});
        
        const url = `http://www.localhost:5173/update-password/${token}`;
        
        const mailObject = await mailSender(email, `<div>The link has been provided to update the link<a href="http://www.localhost:5173/update-password/${token}">http://www.localhost:5173/update-password/${token}</a></div>`);

        return res.status(200).json({
            success: true,
            message: "Reset password email send successfully!",
            mailObject,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error in generating reset password token",
            data: error.message
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const {
            newPassword,
            confirmPassword,
            token,
        } = req.body;

        console.log(newPassword, confirmPassword, token);

        if(newPassword !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "passwords do not match",
            });
        }

        console.log("66");

        const checkIfUserExists = await User.findOne({token});
        if(!checkIfUserExists) {
            return res.status.json({
                success: false,
                message: "user doesnot exist to change password based on token, Invalid token",
            })
        }

        console.log("72");

        if(checkIfUserExists.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token timedout, Generate a new one again"
            });
        }

        console.log(newPassword, confirmPassword)

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate({token},
                                                        {
                                                            $set: {
                                                                password:hashedPassword,
                                                            }
                                                        },
                                                        { new: true } ); 
        
        return res.status(201).json({
            success: true,
            message: "Your Password has been updated successfully!"
        });                                                

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};