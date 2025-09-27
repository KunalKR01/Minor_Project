

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    }
});


async function sendOtp(email, otp) {

    try {
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Your OTP for signUp",
            text: `Your OTP is- ${otp}. Note- It will expire in 10 minutes`,
            html: `<h3> Your OTP is- <b>${otp} </b>. </h3> <h4>Note- It will expire in 10 minutes.</h4>`
        }

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log("error in nodeMailer- " + error);
        throw new Error("Failed to send OTP");

    }
}

module.exports = sendOtp;