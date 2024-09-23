"use client";
import { Input } from "../../ui/input";
import SearchIcon from "../../icons/searchIcon";
import { useGetChatList } from "../../../utils/hooks/queries";
import ChatCard from "./chatCard";
import { useChatContext } from "../../../lib/contexts/chatContext";
import { useUserOnlineContext } from "@/lib/contexts/chatOnlineContext";
import { useState } from "react";

export default function ChatListing() {
    const { data, isLoading } = useGetChatList();
    const chats: any[] = data?.data || [];
    const { selectedChat, setSelectedChat } = useChatContext();
    const { onlineUsers } = useUserOnlineContext();
    const [searchValue, setSearchValue] = useState("");

    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="flex-1 overflow-auto">
            <div className="p-4">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        className="w-full rounded-md bg-white px-8 py-2 shadow-sm dark:bg-gray-950"
                        placeholder="Search chats..."
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
            </div>
            <div className="divide-y dark:divide-gray-800">
                {chats
                    .filter((chatobj) => {
                        if (searchValue === "") return true;
                        const filter = new RegExp(
                            searchValue.split("").join(".*"),
                            "i",
                        );
                        return filter.test(chatobj.name);
                    })
                    .map((chat) => (
                        <ChatCard
                            name={chat.name || ""}
                            lastMessage={
                                chat.lastMessage?.message as unknown as string
                            }
                            lastMessageTime={chat.lastMessageAt}
                            profilePicture={chat.icon || ""}
                            key={chat._id}
                            chatId={chat._id}
                            isOnline={onlineUsers.includes(
                                chat.users[0].userId._id,
                            )}
                            userId={
                                chat.type === "private"
                                    ? chat.users[0].userId._id
                                    : ""
                            }
                            isSelected={selectedChat.chatId === chat._id}
                            setSelectedChat={setSelectedChat}
                        />
                    ))}
            </div>
        </div>
    );
}
