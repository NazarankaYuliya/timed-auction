import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { sendEmail } from "@utils/sendEmail";
import { verificationEmailTemplate } from "@utils/verificationEmailTameplate";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    email,
    password,
    street,
    postalCode,
    city,
    country,
    phone,
    agb,
  } = await req.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      street,
      postalCode,
      city,
      country,
      phone,
      agb,
      isVerified: false,
    });

    const verificationToken = newUser.getVerificationToken();

    await newUser.save();

    const verificationLink = `${process.env.BASE_URL}/verify-email?verifyToken=${verificationToken}&id=${newUser._id}`;
    const message = verificationEmailTemplate(verificationLink);

    await sendEmail(newUser.email, "Email verification", message);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed", error: error },
      { status: 500 },
    );
  }
}
