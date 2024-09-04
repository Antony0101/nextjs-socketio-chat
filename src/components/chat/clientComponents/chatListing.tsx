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
            {/* <Link
                className="flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
                href="#"
            >
                <Image
                    alt="Avatar"
                    className="h-10 w-10 rounded-full"
                    height={40}
                    src="/avatar.png"
                    style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                    }}
                    width={40}
                />
                <div className="flex-1">
                    <h4 className="font-medium">Olivia Rhye</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Did you see the new design?
                    </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-blue-500" />
            </Link>
            <Link
                className="flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
                href="#"
            >
                <Image
                    alt="Avatar"
                    className="h-10 w-10 rounded-full"
                    height={40}
                    src="/avatar.png"
                    style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                    }}
                    width={40}
                />
                <div className="flex-1">
                    <h4 className="font-medium">Miriam Williamson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {"Let's discuss the project."}
                    </p>
                </div>
            </Link>
            <Link
                className="flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
                href="#"
            >
                <Image
                    alt="Avatar"
                    className="h-10 w-10 rounded-full"
                    height={40}
                    src="/avatar.png"
                    style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                    }}
                    width={40}
                />
                <div className="flex-1">
                    <h4 className="font-medium">Group Chat</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Team meeting agenda
                    </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-blue-500" />
            </Link> */}
        </div>
    );
}
