"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useGetChatList } from "@/utils/hooks/queries";
import ChatCard from "./chatCard";

export default function ChatListing() {
    const { data, isLoading } = useGetChatList();
    const chats: any[] = data?.data || [];
    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="divide-y dark:divide-gray-800">
            {chats.map((chat) => (
                <ChatCard
                    name={chat.name || ""}
                    lastMessage={chat.lastMessage?.message as unknown as string}
                    lastMessageTime={chat.lastMessageAt}
                    profilePicture={chat.icon || ""}
                    key={chat._id}
                    chatId={chat._id}
                    isOnline={true}
                />
            ))}
        </div>
    );
}
