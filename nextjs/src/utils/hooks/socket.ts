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

export const useOnNewMessage = () => {
    const [arrivalMessage, setArrivalMessage] = useState<null | {
        isMyMessage: boolean;
        text: string;
        time: string;
        chatId: string;
    }>(null);
    const { user } = useUserContext();

    useEffect(() => {
        const onNewMessage = (newMessage: NewMessage) => {
            console.log("[NEWMESSAGE EVENT]:", newMessage);
            setArrivalMessage({
                isMyMessage: newMessage.sender === user._id,
                text: newMessage.message,
                time: newMessage.createdAt,
                chatId: newMessage.chatId,
            });
        };
        socket.on("newMessage", onNewMessage);
        return () => {
            socket.off("newMessage", onNewMessage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { arrivalMessage, setArrivalMessage };
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
