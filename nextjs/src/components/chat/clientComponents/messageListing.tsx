"use client";
import { useChatContext } from "../../../lib/contexts/chatContext";
import { useUserContext } from "../../../lib/contexts/userContext";
import { useGetMessageList } from "../../../utils/hooks/queries";
import { profile } from "console";
import Image from "next/image";

type MessageProps = {
    message: string;
    time: string;
    profilePicture: string;
};

function SendedMessage({ message, time, profilePicture }: MessageProps) {
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
    const { selectedChat } = useChatContext();
    const { user } = useUserContext();
    const { data, isLoading } = useGetMessageList({
        chatId: selectedChat.chatId,
    });
    const messages = data?.data?.messages || [];
    return (
        <>
            {/* <SendMessage />
            <ReceivedMessage /> */}
            {messages.map((item, index) => {
                const senderId = item.senderId as any;
                if (senderId._id === user._id) {
                    return (
                        <SendedMessage
                            key={index}
                            message={item.message}
                            time={new Date(
                                item.createdAt!,
                            ).toLocaleTimeString()}
                            profilePicture={senderId.profilePicture}
                        />
                    );
                } else {
                    return (
                        <ReceivedMessage
                            key={index}
                            message={item.message}
                            time={new Date(
                                item.createdAt!,
                            ).toLocaleTimeString()}
                            profilePicture={senderId.profilePicture}
                        />
                    );
                }
            })}
        </>
    );
}
