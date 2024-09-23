"use client";

import { socket } from "@/lib/sockectClient";
import {
    useMemberAddedToGroup,
    useMemberRemovedFromGroup,
    useOnNewMessage,
    useOnOnlineStatusChange,
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
    useOnOnlineStatusChange();
    useUsersOnline();
    useOnNewMessage();
    useMemberAddedToGroup();
    useMemberRemovedFromGroup();

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
