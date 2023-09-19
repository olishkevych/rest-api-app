const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "natasha-o@ukr.net",
    pass: MAIL_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   to: "",
//   from: "natasha-o@ukr.net",
//   subject: "",
//   html: "",
// };
const sendEmail = (email) =>
  transport
    .sendMail(email)
    .then(() => console.log("Email sent successfully"))
    .catch((err) => console.log(err.message));

module.exports = sendEmail;
