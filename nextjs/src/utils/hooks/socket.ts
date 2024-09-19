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

import { useUserContext } from "@/lib/contexts/userContext";
import { useQueryClient } from "@tanstack/react-query";

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
    // return { arrivalMessage, setArrivalMessage };
};

export const useOnOnlineStatusChange = () => {
    const [userOnlineStatus, setUserOnlineStatus] = useState<
        {} | UserOnlineStatus
    >({});

    useEffect(() => {
        socket.on("userStatusChange", (data: UserOnlineStatus) => {
            console.log(data);
            setUserOnlineStatus(data);
        });
    }, []);
    console.log("[USERONLINESTATUSCHANGE:]", userOnlineStatus);

    return [userOnlineStatus];
};

const isUserOnlineStatus = (obj: any): obj is UserOnlineStatus => {
    return obj?.status && obj.userId;
};

export const useUsersOnline = () => {
    const [usersOnline, setUsersOnline] = useState<string[]>([""]);
    const [userOnlineStatus] = useOnOnlineStatusChange();

    //   set default online users on initial socket connection
    useEffect(() => {
        socket.on("usersOnline", (data) => {
            setUsersOnline(data);
        });
    }, []);

    useEffect(() => {
        if (isUserOnlineStatus(userOnlineStatus)) {
            if (userOnlineStatus.status === "online") {
                setUsersOnline((prev) => {
                    return [...prev, userOnlineStatus.userId];
                });
            }
            if (userOnlineStatus.status === "offline") {
                setUsersOnline((prev) => {
                    return prev.filter((id) => id !== userOnlineStatus.userId);
                });
            }
        }
    }, [userOnlineStatus]);

    console.log(usersOnline);
    return [usersOnline];
};
