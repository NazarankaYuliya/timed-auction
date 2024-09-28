import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { sendEmail } from "@utils/sendEmail";
import { verificationEmailTemplate } from "@utils/verificationEmailTameplate";

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

    if (user.isVerified) {
      return NextResponse.json(
        { message: "This user is already verified" },
        { status: 400 },
      );
    }

    const verificationToken = user.getVerificationToken();
    await user.save();

    const message = verificationEmailTemplate(verificationToken);

    await sendEmail(user.email, "E-Mail-Bestätigung", message);

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to resend verification email", error: error },
      { status: 500 },
    );
  }
}
