import { Types } from "mongoose";
import { Server, Socket } from "socket.io";

export type ServerToClientEvents = {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    usersOnline: (onlineUsers: string[]) => void;
    userStatusChange: (data: {
        status: "online" | "offline";
        userId: Types.ObjectId;
    }) => void;
    newMessage: (message: any) => void;
    messageDeleted: (messageId: string) => void;
    memberAdded: (data: { userId: string; chatId: string }) => void;
    memberRemoved: (data: { userId: string; chatId: string }) => void;
};

export type ClientToServerEvents = {
    hello: () => void;
    createMessage: (message: any, callback: (message: any) => void) => void;
    deleteMessage: (
        data: { messageId: Types.ObjectId; userId: Types.ObjectId },
        callback: (data: any) => void
    ) => void;
    addMember: (
        data: { chatId: string; userIds: string[] },
        callback: (data: any) => void
    ) => void;
    removeMember: (
        data: { chatId: string; userIds: string[] },
        callback: (data: any) => void
    ) => void;
};

export type InterServerEvents = {
    ping: () => void;
};

export type SocketData = {
    session: any;
    name: string;
    age: number;
};

export type SocketInstance = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

export type ServerInstance = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;
