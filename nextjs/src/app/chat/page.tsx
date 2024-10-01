import { getAuthUser } from "../../server/actions/auth.action";
import ChatArea from "../../components/chat/chatArea";
import ChatSideBar from "../../components/chat/chatSideBar";
import { ChatIdContextProvider } from "../../lib/contexts/chatContext";
import { redirect } from "next/navigation";
import SetUserContextComponent from "../../components/chat/clientComponents/setUserContext";
import { UserContextProvider } from "@/lib/contexts/userContext";
import { UserOnlineContextProvider } from "@/lib/contexts/chatOnlineContext";

export default async function ChatPage() {
    const { success, data } = await getAuthUser();
    if (!success) {
        redirect("/");
    }
    return (
        <ChatIdContextProvider>
            <UserOnlineContextProvider>
                <SetUserContextComponent />
                {/* <div className="grid h-screen w-full grid-cols-[300px_1fr] overflow-hidden"> */}
                <div className="h-screen w-full flex justify-between overflow-hidden relative">
                    <ChatSideBar userId={data.uid} />
                    <ChatArea />
                </div>
            </UserOnlineContextProvider>
        </ChatIdContextProvider>
    );
}
