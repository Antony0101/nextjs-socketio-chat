"use client";
import { useGetChatList } from "@/utils/hooks/queries";
import ChatCard from "./chatCard";
import { useChatContext } from "@/lib/contexts/chatContext";

export default function ChatListing() {
    const { data, isLoading } = useGetChatList();
    const chats: any[] = data?.data || [];
    const { selectedChat, setSelectedChat } = useChatContext();
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
                    isSelected={selectedChat.chatId === chat._id}
                    setSelectedChat={setSelectedChat}
                />
            ))}
        </div>
    );
}
