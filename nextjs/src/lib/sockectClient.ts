"use client";

import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

export type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

export type ServerToClientEvents = {
    usersOnline: (data: string[]) => void;
    userStatusChange: (data: any) => void;
    // TODO: setup type for data
    newMessage: (message: NewMessage) => void;
};

export type ClientToServerEvents = {
    createMessage: (
        message: {
            chatId: string;
            message: string;
            messageType: "text";
        },
        fn: (data: any) => void,
    ) => void;
};

export type NewMessage = {
    chatId: string;
    senderId: string;
    senderProfile: Profile;
    messageType: string;
    message: string;
    seen: string[];
    createdAt: string;
    updatedAt: string;
    _id: string;
};

export type ChatMessage = {
    isMyMessage: boolean;
    text: string;
    time: string;
    chatId: string;
};

export type Profile = {
    _id: string;
    userId: string;
    name: string;
    profilePicture: string;
    lastSeen: string;
    createdAt: string;
    updatedAt: string;
};

export type UserOnlineStatus = {
    status: "online" | "offline";
    userId: string;
};

let authToken = "";
if (typeof document !== "undefined") {
    const cookie = document?.cookie;
    authToken = cookie.split("auth=")[1].split(";")[0];
}

export const socket: SocketInstance = io(
    process.env.NEXT_PUBLIC_SOCKET_URL || "",
    {
        autoConnect: false,
        auth: {
            token: authToken,
        },
    },
);
