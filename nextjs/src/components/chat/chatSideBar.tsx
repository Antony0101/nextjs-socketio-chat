import AddChatButton from "./clientComponents/addChatButton";
import ChatListing from "./clientComponents/chatListing";
import UserMenu from "./clientComponents/userMenu";
import { AddGroupDialog } from "./clientComponents/addGroupButton";

type Props = {
    userId: string;
};

export default async function ChatSideBar({ userId }: Props) {
    return (
        <div className="flex flex-col border-r bg-gray-100/40 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="flex h-[60px] items-center border-b px-4">
                <h2 className="text-lg font-semibold">Chats</h2>
                <div className="ml-auto flex items-center gap-2">
                    <AddGroupDialog />
                    <AddChatButton userId={userId} />
                    <UserMenu />
                </div>
            </div>
            <ChatListing />
        </div>
    );
}
