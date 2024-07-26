import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/utils/dbConnect";
import ProfileLink from "@/models/ProfileLinks";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  await dbConnect();

  try {
    const { platformLinks } = await request.json();

    console.log("platformLinks", platformLinks);

    console.log(platformLinks);
    if (
      !Array.isArray(platformLinks) ||
      platformLinks.some(
        (link) => !link.platformName || !Array.isArray(link.userLinks)
      )
    ) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(params.userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const profileLink = await ProfileLink.findOne({ user: params.userId });

    if (profileLink) {
      profileLink.platformLinks = platformLinks;
      await profileLink.save();
    } else {
      const newProfileLink = new ProfileLink({
        user: params.userId,
        platformLinks,
      });
      await newProfileLink.save();
    }

    return NextResponse.json(
      { message: "Profile links saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  await dbConnect();

  try {
    if (!ObjectId.isValid(params.userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const profileLink = await ProfileLink.findOne({ user: params.userId });

    if (!profileLink) {
      return NextResponse.json(
        { message: "Profile links not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profileLink, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
