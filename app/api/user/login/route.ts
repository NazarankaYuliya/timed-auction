import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import { createSession } from "@utils/session";
import User from "@models/user";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;

    if (!email || !username) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
      });
      await user.save();
    }

    await createSession(user._id, "user");

    return NextResponse.json({ message: "Admin found" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
