import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat, getChats, getUsers } from "@/actions/chat.action";

export const useGetUserList = (userId: string) => {
    return useQuery({
        queryKey: [`userList`],
        queryFn: async () => {
            const data = await getUsers(userId);
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
