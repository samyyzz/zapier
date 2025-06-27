import "dotenv/config";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_ZAP_KEY,
  },
});

export const sendEmail = async (
  to: string,
  from: string = "ranjansameer89@gmail.com",
  subject: string = "Hello form zappier",
  body: string
) => {
  await transport.sendMail({
    to,
    from,
    subject,
    text: body,
  });
  console.log("Email sent successfullly !");
};
