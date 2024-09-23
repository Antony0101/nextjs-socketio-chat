import SendChatMessage from "./clientComponents/sendComponents";
import MessageListing from "./clientComponents/messageListing";
import ChatHeader from "./clientComponents/chatHeader";
import SocketComponent from "./clientComponents/socketComponent";

export default async function ChatArea() {
    return (
        <div className="flex flex-col relative">
            <SocketComponent />
            <ChatHeader />
            <div className="flex-1 overflow-auto max-h-[90vh] p-4">
                <div className="grid gap-4">
                    <MessageListing />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <SendChatMessage />
            </div>
        </div>
    );
}
