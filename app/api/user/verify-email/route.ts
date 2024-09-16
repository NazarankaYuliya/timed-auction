import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { token, email } = await request.json();

    const verifyToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email,
      verifyToken,
      verifyTokenExpire: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" + error },
      { status: 500 },
    );
  }
}
