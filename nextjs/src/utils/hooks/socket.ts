import { socket, NewMessage, UserOnlineStatus } from "@/lib/sockectClient";
import { useEffect, useState } from "react";

// initialise socket connection
export const useSocketConnect = () => {
    useEffect(() => {
        // no-op if the socket is already connected
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);
};

import { useQueryClient } from "@tanstack/react-query";
import { useUserOnlineContext } from "@/lib/contexts/chatOnlineContext";

export const useOnNewMessage = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const onNewMessage = (newMessage: NewMessage) => {
            console.log("[NEWMESSAGE EVENT]:", newMessage);
            const newMessageData = {
                _id: newMessage._id,
                chatId: newMessage.chatId,
                message: newMessage.message,
                messageType: newMessage.messageType,
                senderId: newMessage.senderProfile,
                seen: newMessage.seen,
                createdAt: newMessage.createdAt,
                updatedAt: newMessage.updatedAt,
            };
            console.log("[NEWMESSAGEDATA]:", newMessageData);

            const queryCache = queryClient.getQueryCache();
            const query = queryCache.find({
                queryKey: ["messageList", newMessage.chatId],
            });
            console.log(`query ${newMessage.chatId}: `, query?.options);
            if (query) {
                const messages = queryClient.getQueryData([
                    "messageList",
                    newMessage.chatId,
                ]) as any[];
                console.log("[MESSAGES]:", messages);
                queryClient.setQueryData(
                    ["messageList", newMessage.chatId],
                    [newMessageData, ...messages],
                );
                queryClient.invalidateQueries({
                    queryKey: ["chatList"],
                });
                // queryClient.invalidateQueries({
                //     queryKey: ["messageList", newMessage.chatId],
                // });
            }
        };
        socket.on("newMessage", onNewMessage);
        return () => {
            socket.off("newMessage", onNewMessage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export const useOnOnlineStatusChange = () => {
    const { setOnlineUsers } = useUserOnlineContext();
    useEffect(() => {
        socket.on("userStatusChange", (data: UserOnlineStatus) => {
            const { status, userId } = data;
            setOnlineUsers((prev) => {
                if (status === "online") {
                    const temp = prev.filter((id) => id !== userId);
                    return [...temp, userId];
                } else {
                    return prev.filter((id) => id !== userId);
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export const useUsersOnline = () => {
    const { setOnlineUsers } = useUserOnlineContext();
    //   set default online users on initial socket connection
    useEffect(() => {
        socket.on("usersOnline", (data) => {
            setOnlineUsers(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
