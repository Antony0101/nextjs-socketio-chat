import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createChat,
    getChats,
    getMessages,
    getUsers,
    getUsersInGroup,
} from "../../server/actions/chat.action";
import { getUserDetails } from "../../server/actions/user.action";

export const useGetUserList = () => {
    return useQuery({
        queryKey: [`userList`],
        queryFn: async () => {
            const data = await getUsers();
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetUsersInGroup = ({
    groupId,
    type,
}: {
    groupId: string;
    type: "in" | "available" | "allExceptSelf";
}) => {
    return useQuery({
        queryKey: [`userList`, groupId, type],
        queryFn: async () => {
            const data = await getUsersInGroup(groupId, type);
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetSelfDetails = () => {
    return useQuery({
        queryKey: [`selfDetails`],
        queryFn: async () => {
            const data = await getUserDetails();
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetChatList = () => {
    return useQuery({
        queryKey: [`chatList`],
        queryFn: async () => {
            const data = await getChats();
            return data;
        },
        staleTime: 1000 * 60 * 5,
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
            const data = (await getMessages(chatId)).data?.messages;
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
