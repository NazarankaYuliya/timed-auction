import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email, code, newPassword } = await request.json();

    const resetToken = crypto.createHash("sha256").update(code).digest("hex");

    const user = await User.findOne({
      email,
      resetToken,
      resetTokenExpire: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );
    }

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return NextResponse.json(
      { message: "Password successfully reset" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" + error },
      { status: 500 },
    );
  }
}
