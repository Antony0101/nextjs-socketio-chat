import { Server } from "socket.io";
import http from "http";
import SocketEventsController from "./SocketEventsController.js";
import { ServerInstance } from "./socketIOTypes.js";
// import { verifyCookie } from "../../utils/helpers/authCookieChecker.js";
// import { getUserDetails } from "./user.internal.js";
import ChatModel from "../models/chat.model.js";

const setupWss = (httpServer: http.Server) => {
    const wss: ServerInstance = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    wss.use(async (socket, next) => {
        try {
            const token =
                socket.handshake.auth.token || socket.handshake.headers.token;
            // const jwtSecret = process.env.JWT;
            // const auth = await verifyCookie({ value: token } as any);
            // if (!auth.authStatus) {
            //     return next(new Error("Unauthorized"));
            // }
            // const user = getUserDetails(auth?.payload?.uid!);
            // socket.data.session = user;
            socket.data.session = {};
            next();
        } catch (err: any) {
            //console.log(err);
            return next(err);
        }
    });

    wss.on("connection", async (ws) => {
        const chats = await ChatModel.find({
            users: { $elemMatch: { userId: ws.data.session._id } },
        });
        const chatObjects = chats.map((chat) => chat.toObject());
        // only private chat is considered for online event
        const PrivateConnections = chatObjects
            .filter((x) => x.type === "private")
            .map((x) => {
                return {
                    chatId: x._id,
                    ...x.users.find(
                        (y) =>
                            y.userId?.toString() !==
                            ws.data.session._id.toString(),
                    ),
                };
            });
        const onlineUsers: string[] = [];
        PrivateConnections.forEach((x) => {
            if (!x || !x.userId) return;
            ws.join(`from-${x.userId}`); // join room for online event and disconnect event
            if (wss.sockets.adapter.rooms.get(`to-${x.userId}`)) {
                // check if user is online
                onlineUsers.push(x.userId.toString());
            }
        });

        const GroupConnections = chats.filter((x) => x.type === "group");
        GroupConnections.forEach((x) => {
            ws.join(`to-${x._id}`);
        });

        ws.emit("usersOnline", onlineUsers);

        ws.to(`from-${ws.data.session._id}`).emit("userStatusChange", {
            status: "online",
            userId: ws.data.session._id,
        });

        ws.join(`to-${ws.data.session._id}`);

        ws.on("createMessage", (data, callback) =>
            SocketEventsController.sendMessageEvent(ws, data, callback),
        );

        ws.on("deleteMessage", (data, callback) =>
            SocketEventsController.deleteMessageEvent(ws, data, callback),
        );
        // ws.on(wsEvents.USER_SAW_MESSAGES, (data, callback) => updateLastSeen(ws, data, callback))
        // ws.on(wsEvents.USER_TYPING, (data, callback) => sendTypingIndicator(ws, data, callback))
        // ws.on(wsEvents.CREATE_BROADCAST_MESSAGE, (data, callback) => createBroadcastMessage(ws, data, callback))

        ws.on("disconnect", async () => {
            ws.to(`from-${ws.data.session._id}`).emit("userStatusChange", {
                status: "offline",
                userId: ws.data.session._id,
            });
        });
    });

    return wss;
};

export default setupWss;
