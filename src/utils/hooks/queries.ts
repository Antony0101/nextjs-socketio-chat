import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createChat,
    getChats,
    getMessages,
    getUsers,
} from "@/actions/chat.action";
import { getUserDetails } from "@/actions/user.action";

export const useGetUserList = () => {
    return useQuery({
        queryKey: [`userList`],
        queryFn: async () => {
            const data = await getUsers();
            return data;
        },
    });
};

export const useGetSelfDetails = () => {
    return useQuery({
        queryKey: [`selfDetails`],
        queryFn: async () => {
            const data = await getUserDetails();
            return data;
        },
    });
};

export const useGetChatList = () => {
    return useQuery({
        queryKey: [`chatList`],
        queryFn: async () => {
            const data = await getChats();
            return data;
        },
    });
};

export const useCreatePrivateChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { userIds: string[] }) => {
            await createChat("private", data.userIds, {});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatList"] });
        },
    });
};

export const useGetMessageList = ({ chatId }: { chatId: string }) => {
    return useQuery({
        queryKey: [`messageList`, chatId],
        queryFn: async () => {
            const data = await getMessages(chatId, 1, 10);
            return data;
        },
    });
};
