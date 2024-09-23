"use client";

import { createContext, useContext, useState } from "react";

export type UserOnlineContextType = {
    onlineUsers: string[];
    setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ChatOnlineContext = createContext<UserOnlineContextType | null>(
    null,
);

export function UserOnlineContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    return (
        <ChatOnlineContext.Provider value={{ onlineUsers, setOnlineUsers }}>
            {children}
        </ChatOnlineContext.Provider>
    );
}

export const useUserOnlineContext = () => {
    const context = useContext(ChatOnlineContext);
    if (!context) {
        throw new Error(
            "useUserOnlineContext must be used within a UserOnlineContextProvider",
        );
    }
    return context;
};
