const nodemailer = require("nodemailer");

const mailSender = async (email, body, title) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST_NAME,
            auth: {
                user:process.env.MAIL_USER_NAME,
                pass:process.env.MAIL_PASSWORD,
            }
        });
    
        const mailOptions = {
            from: "dagger1817@gmail.com",
            to: `${email}`,
            subject: `${title}`,
            text: "This is an OTP/URL email from StudyNotion!",
            html: `${body}`
        }

        // if(otp) {
        //     mailOptions.html = mailOptions.html + `<h1>${otp}</h1>`;
        // }
    
        const info = await transporter.sendMail(mailOptions);

        return info;

    }
    catch(error) {
        console.log("Error sending email in mailSender", error.message);
    }
};

module.exports = mailSender;