import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyCookie } from "./utils/helpers/authCookieChecker";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get("auth");
    if (request.nextUrl.pathname === "/") {
        if (cookie && (await verifyCookie(cookie)).authStatus) {
            return NextResponse.redirect(new URL("/chat", request.nextUrl));
        }
    } else {
        if (!cookie) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
