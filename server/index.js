const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");

const databaseConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors"); 
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;
databaseConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://www.localhost:5173"], 
        credentials: true,
        //allowedHeaders: ["Authorization", "Content-Type"],
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

cloudinaryConnect(); 

//mounting routes
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is running on PORT 4000...."
    })
});

app.listen(PORT, () => {
    console.log("PORT running at PORT 4000");
});