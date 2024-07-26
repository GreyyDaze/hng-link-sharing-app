import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import mongoose from "mongoose";
import ProfileLink from "@/models/ProfileLinks";

const { ObjectId } = mongoose.Types;

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  await dbConnect();

  try {
    const { userId } = params;

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const profileLinks = await ProfileLink.findOne({ user: userId });

    return NextResponse.json({ user, profileLinks }, { status: 200 });
  } catch (error) {
    console.error(error); 
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
