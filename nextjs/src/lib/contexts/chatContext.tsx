"use client";

import { useGetChatList } from "@/utils/hooks/queries";
import { createContext, use, useContext, useEffect, useState } from "react";

type ChatContextType = {
    selectedChat: {
        chatId: string;
        chatName: string;
        profilePicture: string;
        userId: string;
        isOnline: boolean;
        lastSeen: string;
        users: any[];
    };
    setSelectedChat: React.Dispatch<
        React.SetStateAction<{
            chatId: string;
            chatName: string;
            profilePicture: string;
            userId: string;
            isOnline: boolean;
            lastSeen: string;
            users: any[];
        }>
    >;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatIdContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { fetchStatus, data } = useGetChatList();
    const [selectedChat, setSelectedChat] = useState({
        chatId: "",
        chatName: "",
        profilePicture: "",
        userId: "",
        isOnline: false,
        lastSeen: "",
        users: [] as any[],
    });
    useEffect(() => {
        setSelectedChat((prev) => {
            if (data?.data && data?.data.length > 0) {
                const chat = data.data.find((chat) => chat._id === prev.chatId);
                if (!chat) {
                    return prev;
                }
                return {
                    chatId: chat._id,
                    chatName: chat.name || prev.chatName,
                    profilePicture: chat.icon || prev.profilePicture,
                    userId: prev.userId,
                    isOnline: prev.isOnline,
                    lastSeen: prev.lastSeen,
                    users: chat.users as any[],
                };
            }
            return prev;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchStatus]);
    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error(
            "useChatContext must be used within a ChatContextProvider",
        );
    }
    return context;
}
