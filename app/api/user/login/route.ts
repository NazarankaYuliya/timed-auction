import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import { createSession } from "@utils/session";
import User from "@models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await connectToDB();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email }).select("+password +isVerified");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 },
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          message: "Email not verified. Please verify your email.",
        },
        { status: 403 },
      );
    }

    const id = user._id as mongoose.Types.ObjectId;
    await createSession(id.toString(), "user");

    return NextResponse.json({ message: "User logged in" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
