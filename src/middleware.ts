import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import connectDB from "./lib/connectDb";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // what the hell mongoose is not supported in the runtime and i cannot force nextjs to run middleware in the nodejs so i am force to run the code in the root layout.
    // lucky for me i am already using a custom server file to support socket.io so i am moving the connect db to there.
    // connectDB();
}
