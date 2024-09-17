"use client";

import { io } from "socket.io-client";

let authToken = "";
if (typeof document !== "undefined") {
    const cookie = document?.cookie;
    console.log("cookie", cookie);
    authToken = cookie.split("auth=")[1].split(";")[0];
    console.log("authToken", authToken);
}

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
    auth: {
        token: authToken,
    },
});
