const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.auth,
    pass: process.env.pass
  },
});

const sendMail = async (tos, subject, text) => {
  const mailOptions = {
    from: process.env.auth,
    to:tos,
    subject,
    text,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail }