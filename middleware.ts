import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    console.log(pathname);
    const token = await getToken({ req: request });
    console.log("token");
    console.log(token);

    const publicRoutes = ["/", "/register", "/users/:path"];

    console.log(token);
    if (!token && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (token) {
      return NextResponse.redirect(new URL("/links", request.url));
    }

    return null;
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: ["/", "/register", "/users/:path*"],
};
