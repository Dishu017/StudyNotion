const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connection successful!"))
    .catch((error) => {
        console.log("error in coonecting with database");
        console.log(error.message);
        process.exit(1);
    })
};

module.exports = connectDatabase;