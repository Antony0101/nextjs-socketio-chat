"use server";

import { verifyCookie } from "@/utils/helpers/authCookieChecker";
import { cookies } from "next/headers";

async function authHelper() {
    const cookie = cookies().get("auth");
    if (!cookie) {
        throw new Error("unauthorized");
    }
    const auth = await verifyCookie(cookie);
    if (!auth.authStatus) {
        throw new Error("unauthorized");
    }
    return auth.payload!;
}

export { authHelper };
