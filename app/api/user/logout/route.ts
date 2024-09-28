import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { deleteSession } from "@utils/session";

export async function POST() {
  try {
    await deleteSession("user");

    return NextResponse.json({ message: "User logged out" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
