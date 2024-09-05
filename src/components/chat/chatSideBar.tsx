import { Input } from "@/components/ui/input";
import SearchIcon from "../icons/searchIcon";
import AddChatButton from "./clientComponents/addChatButton";
import ChatListing from "./clientComponents/chatListing";
import UserMenu from "./clientComponents/userMenu";

type Props = {
    userId: string;
};

export default async function ChatSideBar({ userId }: Props) {
    return (
        <div className="flex flex-col border-r bg-gray-100/40 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="flex h-[60px] items-center border-b px-4">
                <h2 className="text-lg font-semibold">Chats</h2>
                <div className="ml-auto flex items-center gap-2">
                    <AddChatButton userId={userId} />
                    <UserMenu />
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
            </div>
        </div>
    );
}
