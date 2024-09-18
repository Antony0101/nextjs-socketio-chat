import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import PlusIcon from "../icons/plusIcon";
import SendIcon from "../icons/sendIcon";
import SettingsIcon from "../icons/settingsIcon";
import SendChatMessage from "./clientComponents/sendComponents";
import MessageListing from "./clientComponents/messageListing";
import ChatHeader from "./clientComponents/chatHeader";
import SocketComponent from "./clientComponents/socketComponent";

export default async function ChatArea() {
    return (
        <div className="flex flex-col">
            <SocketComponent />
            <ChatHeader />
            <div className="flex-1 overflow-auto p-4">
                <div className="grid gap-4">
                    <MessageListing />
                </div>
            </div>
            <SendChatMessage />
        </div>
    );
}
