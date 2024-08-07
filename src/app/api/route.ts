import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ authenticated: !!session });
}
