"use client";

import { socket } from "@/lib/sockectClient";
import {
    useOnNewMessage,
    useSocketConnect,
    useUsersOnline,
} from "@/utils/hooks/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {
    children?: React.ReactNode;
};

export default function SocketComponent({ children }: Props) {
    useSocketConnect();
    const [usersOnline] = useUsersOnline();
    useOnNewMessage();

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
    return <>{children}</>;
}
