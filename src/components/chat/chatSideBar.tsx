import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PlusIcon from "@/components/icons/plusIcon";
import UserIcon from "../icons/userIcon";
import SearchIcon from "../icons/searchIcon";
import Link from "next/link";
import AddChatButton from "./clientComponents/addChatButton";
import { Types } from "mongoose";
import ChatListing from "./clientComponents/chatListing";

type Props = {
    userId: string;
};

export default async function ChatSideBar({ userId }: Props) {
    return (
        <div className="flex flex-col border-r bg-gray-100/40 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="flex h-[60px] items-center border-b px-4">
                <h2 className="text-lg font-semibold">Chats</h2>
                <div className="ml-auto flex items-center gap-2">
                    {/* <Button size="icon" variant="ghost">
                        <PlusIcon className="h-5 w-5" />
                        <span className="sr-only">New Group</span>
                    </Button> */}
                    <AddChatButton userId={userId} />
                    <Button size="icon" variant="ghost">
                        <UserIcon className="h-5 w-5" />
                        <span className="sr-only">Profile</span>
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="p-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="w-full rounded-md bg-white px-8 py-2 shadow-sm dark:bg-gray-950"
                            placeholder="Search chats..."
                            type="search"
                        />
                    </div>
                </div>
                <ChatListing />
                {/* <div className="divide-y dark:divide-gray-800">
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
                            <h4 className="font-medium">Jared Palmer</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {"Hey, how's it going?"}
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
                    </Link>
                </div> */}
            </div>
        </div>
    );
}
