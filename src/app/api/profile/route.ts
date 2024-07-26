import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User, { IUser } from "@/models/User";
import mongoose from "mongoose";
import cloudinary from "@/utils/cloudinary";

const { ObjectId } = mongoose.Types;

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const formData = await request.formData();
    
    const userId = formData.get("userId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const profilePic = formData.get("profilePic") as string;


    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const updateData: Partial<IUser> = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;

    if (profilePic) {
      const uploadResult = await cloudinary.v2.uploader.upload(profilePic, {
        folder: "user_profiles", 
      });

      updateData.profilePic = uploadResult.secure_url;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); 
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
