"use server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
// import jwt from "jsonwebtoken";
import * as jose from "jose";

const verifyCookie = async (cookie: RequestCookie): Promise<boolean> => {
    if (!cookie) {
        return false;
    }
    let payload: any = null;
    try {
        // payload = jwt.verify(cookie.value, process.env.JWT_SECRET || "abc");
        payload = await jose.jwtVerify(
            cookie.value,
            new TextEncoder().encode(process.env.JWT || "abc"),
        );
    } catch (e) {
        console.log("error", e);
        return false;
    }
    console.log("payload", payload);
    return !!payload;
};

export { verifyCookie };
