"use client";

import { createContext, useContext, useState } from "react";

type ChatIdContextType = {
    selectedChat: {
        chatId: string;
        chatName: string;
        profilePicture: string;
        isOnline: boolean;
        lastSeen: string;
    };
    setSelectedChat: React.Dispatch<
        React.SetStateAction<{
            chatId: string;
            chatName: string;
            profilePicture: string;
            isOnline: boolean;
            lastSeen: string;
        }>
    >;
};

const ChatIdContext = createContext<ChatIdContextType | null>(null);

export function ChatIdContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedChat, setSelectedChat] = useState({
        chatId: "",
        chatName: "",
        profilePicture: "",
        isOnline: false,
        lastSeen: "",
    });
    return (
        <ChatIdContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatIdContext.Provider>
    );
}

export function useChatIdContext() {
    const context = useContext(ChatIdContext);
    if (!context) {
        throw new Error(
            "useChatIdContext must be used within a ChatIdContextProvider",
        );
    }
    return context;
}
