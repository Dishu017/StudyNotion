const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.auth = async (req, res, next) => {
    try {

        // console.log(req.headers["authorization"]?.replace("Bearer ", ""));
        // console.log("cookies.token:", req.cookies?.token);
        // console.log("body.token:", req.body?.token);
        // console.log("header.authorization:", req.headers?.authorization);
        
        //fetching the token here
        const token =  req.headers["authorization"]?.replace("Bearer ", "")|| 
                        req.body.token || 
                        req.cookies.token;   
                    
        //console.log("Token is", token);
        //verify the token
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "The token is missing!"
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(payload);
            req.user = payload;
            //console.log(req.user);
        }
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "The token is invalid!"
            })
        }
        // console.log("Here");
        next();            
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Could not authenticate based on token, Please login again! Error in auth.js file",
            data: error,
        });
    }
};

exports.isStudent = async (req, res, next) => {
    try {
        if(req.user.role !== "student") {
            return res.status(401).json({
                success: false,
                message: "Not a student, protected route for student"
            });
        }
        next();
    }
    catch(error) {
        return res.status(501).json({
            success: false,
            message: "Cannot check authorisation of Student"
        });
    }  
};

exports.isInstructor = async (req, res, next) => {
    try {
        if(req.user.role !== "instructor") {
            return res.status(401).json({
                success: false,
                message: "Not a Instructor, protected route for Instructor"
            });
        }
        next();
    }
    catch(error) {
        return res.status(501).json({
            success: false,
            message: "Cannot check authorisation of Instructor"
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "Not an Admin, protected route for Admin"
            });
        }
        next();
    }
    catch(error) {
        return res.status(501).json({
            success: false,
            message: "Cannot check authorisation of Admin"
        });
    }
};