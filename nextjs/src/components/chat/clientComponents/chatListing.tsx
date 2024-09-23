"use client";
import { useGetChatList } from "../../../utils/hooks/queries";
import ChatCard from "./chatCard";
import { useChatContext } from "../../../lib/contexts/chatContext";
import { useUserOnlineContext } from "@/lib/contexts/chatOnlineContext";

export default function ChatListing() {
    const { data, isLoading } = useGetChatList();
    const chats: any[] = data?.data || [];
    const { selectedChat, setSelectedChat } = useChatContext();
    const { onlineUsers } = useUserOnlineContext();
    console.log("Online Users: ", onlineUsers);

    if (isLoading) return <div>Loading...</div>;
    console.log("Is Online: ", chats);
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
                    isOnline={onlineUsers.includes(chat.users[0].userId._id)}
                    userId={
                        chat.type === "private" ? chat.users[0].userId._id : ""
                    }
                    isSelected={selectedChat.chatId === chat._id}
                    setSelectedChat={setSelectedChat}
                />
            ))}
        </div>
    );
}
