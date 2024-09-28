import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.IONOS_EMAIL,
        pass: process.env.IONOS_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.IONOS_EMAIL,
      to: userEmail,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return NextResponse.json(
      { message: "Etwas ist schief gelaufen: " + error },
      { status: 500 },
    );
  }
};
