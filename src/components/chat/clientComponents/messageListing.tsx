"use client";
import { useChatIdContext } from "@/lib/contexts/chatContext";
import { useGetMessageList } from "@/utils/hooks/queries";
import { profile } from "console";
import Image from "next/image";

const data = [1, 2, 3];

type MessageProps = {
    message: string;
    time: string;
    profilePicture: string;
};

function SendMessage({ message, time, profilePicture }: MessageProps) {
    return (
        <div className="flex justify-end gap-2">
            <div className="rounded-lg bg-blue-500 p-3 text-sm text-white">
                <p>{message}</p>
                <p className="mt-1 text-xs text-gray-200">{time}</p>
            </div>
            <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src={profilePicture}
                style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                }}
                width={40}
            />
        </div>
    );
}

function ReceivedMessage({ message, time, profilePicture }: MessageProps) {
    return (
        <div className="flex items-end gap-2">
            <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src={profilePicture}
                style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                }}
                width={40}
            />
            <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                <p>{message}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {time}
                </p>
            </div>
        </div>
    );
}

export default function MessageListing() {
    const { selectedChat } = useChatIdContext();
    const { data, isLoading } = useGetMessageList({
        chatId: selectedChat.chatId,
    });
    const messages = data?.data?.messages || [];
    console.log(data);
    return (
        <>
            {/* <SendMessage />
            <ReceivedMessage /> */}
            {messages.map((item, index) => {
                const senderId = item.senderId as any;
                console.log(item);
                return (
                    <ReceivedMessage
                        key={index}
                        message={item.message}
                        time={new Date(item.createdAt!).toLocaleTimeString()}
                        profilePicture={senderId.profilePicture}
                    />
                );
            })}
        </>
    );
}
