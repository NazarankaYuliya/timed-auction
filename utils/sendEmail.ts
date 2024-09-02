import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: userEmail,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" + error },
      { status: 500 },
    );
  }
};
