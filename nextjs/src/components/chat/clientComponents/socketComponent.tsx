"use client";

import { socket } from "@/lib/sockectClient";
import {
    useOnNewMessage,
    useSocketConnect,
    useUsersOnline,
} from "@/utils/hooks/socket";
import { useEffect, useState } from "react";

export default function SocketComponent() {
    useSocketConnect();
    const [usersOnline] = useUsersOnline();
    const { arrivalMessage } = useOnNewMessage();

    useEffect(() => {
        function onConnect() {
            console.log("[SOCKET CONNECTED]");
        }

        function onDisconnect() {
            console.log("[SOCKET DISCONNECTED]");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);
}
