import ChatComponent from "@/components/chat/chatComponent";
import ChatSideBar from "@/components/chat/chatSideBar";

export default function ChatPage() {
    return (
        <div className="grid h-screen w-full grid-cols-[300px_1fr] overflow-hidden">
            <ChatComponent />
            <ChatSideBar />
        </div>
    );
}
