import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/dbConnect";
import User, { IUser } from "@/models/User";

interface RegisterRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email, password }: RegisterRequestBody = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    } as IUser);

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    if (error.name === "MongoError") {
      return NextResponse.json(
        { message: "Registration failed. Please try again later." },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
