import { getAuthUser } from "@/actions/auth.action";
import ChatArea from "@/components/chat/chatArea";
import ChatSideBar from "@/components/chat/chatSideBar";

export default async function ChatPage() {
    const { data } = await getAuthUser();
    console.log(data);
    return (
        <div className="grid h-screen w-full grid-cols-[300px_1fr] overflow-hidden">
            <ChatSideBar userId={data.uid} />
            <ChatArea />
        </div>
    );
}
