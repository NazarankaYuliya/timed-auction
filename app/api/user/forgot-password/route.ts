import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { sendEmail } from "@utils/sendEmail";
import { passwordResetEmailTemplate } from "@utils/passwordResetEmailTemplate";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 },
      );
    }

    const passwordResetToken = user.getPasswordResetToken();
    await user.save();

    const message = passwordResetEmailTemplate(passwordResetToken);

    await sendEmail(user.email, "Passwort zurücksetzen", message);

    return NextResponse.json(
      { message: "Reset password email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send reset password email", error: error },
      { status: 500 },
    );
  }
}
