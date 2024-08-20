import { useQuery, useMutation } from "@tanstack/react-query";
import { createChat, getUsers } from "@/actions/chat.action";
import { Types } from "mongoose";

export const useGetUserList = (userId: Types.ObjectId) => {
    return useQuery({
        queryKey: [`userList`],
        queryFn: async () => {
            const data = await getUsers(userId);
            return data;
        },
    });
};

export const useCreatePrivateChat = () => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { userIds: string[] }) => {
            await createChat(
                "private",
                data.userIds as unknown as Types.ObjectId[],
                {},
            );
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["activeJobs"] });
        },
    });
};
