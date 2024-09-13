"use client";
import { useChatContext } from "@/lib/contexts/chatContext";
import Image from "next/image";

export default function ChatHeader() {
    const { selectedChat } = useChatContext();
    if (!selectedChat.chatId) return <></>;
    return (
        <div className="flex h-[60px] items-center border-b bg-gray-100/40 px-4 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="flex items-center gap-4">
                <Image
                    alt="Avatar"
                    className="h-10 w-10 rounded-full"
                    height={40}
                    src={
                        selectedChat?.profilePicture.startsWith("/")
                            ? selectedChat?.profilePicture
                            : "/" + selectedChat?.profilePicture
                    }
                    style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                    }}
                    width={40}
                />
                <div>
                    <h4 className="font-medium">{selectedChat.chatName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Online
                    </p>
                </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
                {/* <Button size="icon" variant="ghost">
                        <PlusIcon className="h-5 w-5" />
                        <span className="sr-only">New Group</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                        <SettingsIcon className="h-5 w-5" />
                        <span className="sr-only">Group Settings</span>
                    </Button> */}
            </div>
        </div>
    );
}
