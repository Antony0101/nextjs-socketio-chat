"use client";

import { createContext, useContext, useState } from "react";

type UserContextType = {
    user: {
        name: string;
        username: string;
        profilePicture: string;
        _id: string;
    };
    setUser: React.Dispatch<
        React.SetStateAction<{
            name: string;
            username: string;
            profilePicture: string;
            _id: string;
        }>
    >;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState({
        name: "",
        username: "",
        profilePicture: "",
        _id: "",
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "useUserContext must be used within a UserContextProvider",
        );
    }
    return context;
}
