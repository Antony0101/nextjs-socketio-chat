"use client";

import { createContext, useContext, useState } from "react";

type ChatContextType = {
    selectedChat: {
        chatId: string;
        chatName: string;
        profilePicture: string;
        userId: string;
        isOnline: boolean;
        lastSeen: string;
    };
    setSelectedChat: React.Dispatch<
        React.SetStateAction<{
            chatId: string;
            chatName: string;
            profilePicture: string;
            userId: string;
            isOnline: boolean;
            lastSeen: string;
        }>
    >;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatIdContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedChat, setSelectedChat] = useState({
        chatId: "",
        chatName: "",
        profilePicture: "",
        userId: "",
        isOnline: false,
        lastSeen: "",
    });
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
