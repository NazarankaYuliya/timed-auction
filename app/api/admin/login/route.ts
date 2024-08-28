import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@utils/database";
import Admin from "@models/admin";
import { createSession } from "@utils/session";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    await createSession(admin._id, "admin");

    return NextResponse.json({ message: "Admin found" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
