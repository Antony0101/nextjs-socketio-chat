"use server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
// import jwt from "jsonwebtoken";
import * as jose from "jose";

const verifyCookie = async (
    cookie: RequestCookie | undefined,
): Promise<{
    authStatus: boolean;
    payload: { uid: string; tid: string } | null;
}> => {
    if (!cookie) {
        return { authStatus: false, payload: null };
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
        return { authStatus: false, payload: null };
    }
    return { authStatus: !!payload, payload: payload?.payload };
};

export { verifyCookie };
