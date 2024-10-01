import SendChatMessage from "./clientComponents/sendComponents";
import MessageListing from "./clientComponents/messageListing";
import ChatHeader from "./clientComponents/chatHeader";
import SocketComponent from "./clientComponents/socketComponent";

export default async function ChatArea() {
    return (
        <div className="hidden md:flex md:flex-col w-full md:relative bg-white">
            <SocketComponent />
            <ChatHeader />
            <div className="flex justify-between overflow-auto max-h-[90vh] p-4 w-full">
                <div className="flex flex-col gap-4 w-full">
                    <MessageListing />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <SendChatMessage />
            </div>
        </div>
    );
}
