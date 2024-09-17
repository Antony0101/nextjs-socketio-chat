"use server";
import { Types } from "mongoose";
import UserModel, { UserEntity } from "../models/user.model";
import ChatModel, { ChatDocument, ChatEntity } from "../models/chat.model";
import MessageModel, {
    MessageDocument,
    MessageEntity,
} from "../models/message.model";
import initAction from "../../lib/initAction";
import actionWrapper from "../../lib/wrappers/serverActionWrapper";
import { ActionReturnType } from "./types.action";
import {
    mongodbArrayConverter,
    mongodbObjectConverter,
    mongodbRecursiveObjectConverter,
} from "../../utils/helpers/mongodbObjectConverter";
import { authHelper } from "./helper.action";
// import { createMessage, deleteMessage } from "../internalAction/chat.internal";

// const getSingleChat = async (
//     candidateId: Types.ObjectId,
//     recruiterId: Types.ObjectId,
// ) => {
//     const chat = await ChatModel.findOne(
//         {
//             $and: [
//                 { users: { $elemMatch: { userId: candidateId } } },
//                 { users: { $elemMatch: { userId: recruiterId } } },
//             ],
//         },
//         { _id: 1, users: 1 },
//     );
//     return chat;
// };

const getUsers = actionWrapper(
    async (): Promise<ActionReturnType<UserEntity[]>> => {
        await initAction();
        const userId = (await authHelper()).uid;
        const users = await UserModel.find({
            _id: { $ne: userId },
            privateChatUsers: { $ne: userId },
        });
        return {
            success: true,
            data: mongodbArrayConverter(users) as any,
            message: "users fetched",
        };
    },
);

const getUsersInGroup = actionWrapper(
    async (
        groupId: string,
        type: "in" | "available" | "allExceptSelf",
    ): Promise<ActionReturnType<UserEntity[]>> => {
        await initAction();
        const userId = (await authHelper()).uid;
        if (type === "allExceptSelf") {
            const users = await UserModel.find({
                _id: { $ne: userId },
            });
            return {
                success: true,
                data: mongodbArrayConverter(users) as any,
                message: "users fetched",
            };
        }
        const chat = await ChatModel.findOne({ _id: groupId });
        if (!chat) throw new Error("chatId is invalid");
        if (chat.type !== "group") throw new Error("chat is not a group chat");
        const userIds = chat.users.map((user) => user.userId);
        let users: UserEntity[] = [];
        if (type === "in") {
            users = await UserModel.find({
                _id: { $in: userIds },
            });
        } else {
            users = await UserModel.find({
                _id: { $nin: userIds },
            });
        }
        return {
            success: true,
            data: mongodbArrayConverter(users) as any,
            message: "users fetched",
        };
    },
);

const getChats = actionWrapper(
    async (): Promise<ActionReturnType<ChatEntity[]>> => {
        await initAction();
        const userId = (await authHelper()).uid;
        const chats = await ChatModel.find(
            { users: { $elemMatch: { userId } } },
            {},
            { sort: { lastMessageAt: -1 } },
        )
            .populate("lastMessage")
            .populate("users.userId");
        // populate or aggreagate users in chat to get user details as only the group chat has photo and name not private chat . for private chat you have to use photo and name of the other user.
        const chatObjects = chats.map((chat) => chat.toObject());
        const modifiedChatObjects = chatObjects.map((chat: any) => {
            const chatObj: typeof chat & {
                icon?: string;
                name?: string;
                users: {
                    userId: { profilePicture: string; name: string };
                }[];
            } = chat as any;
            chat.users = chat.users
                .filter(
                    (user: any) =>
                        user.userId?._id.toString() !== userId?.toString(),
                )
                .map((user: any) => {
                    return {
                        ...user,
                        userId: {
                            profilePicture: user.userId.profilePicture,
                            name: user.userId.name,
                        },
                    };
                });
            if (chat.type === "private") {
                (chatObj.icon = chatObj.users[0].userId.profilePicture),
                    (chatObj.name = chatObj.users[0].userId.name);
            }
            return chat;
        });
        return {
            success: true,
            data: mongodbRecursiveObjectConverter(modifiedChatObjects) as any,
            message: "chats fetched",
        };
    },
);

const getMessages = actionWrapper(
    async (
        chatId: string,
        // userId: Types.ObjectId,
    ): Promise<
        ActionReturnType<{
            messages: MessageDocument[];
            count: number;
            chat: ChatDocument | undefined;
        }>
    > => {
        if (!chatId) {
            return {
                success: true,
                message: "messages fetched successsfuly",
                data: {
                    messages: [],
                    count: 0,
                    chat: undefined,
                },
            };
        }
        await initAction();
        const userId = (await authHelper()).uid;
        const chat = await ChatModel.findOne({ _id: chatId });
        if (!chat) throw new Error("chatId is invalid");
        const index = chat.users.findIndex((obj) => {
            return obj.userId?.toString() === userId.toString();
        });
        if (index === -1) throw new Error("userId is invalid");
        const count = await MessageModel.countDocuments({ chatId: chatId });
        const messages = await MessageModel.find(
            { chatId: chatId },
            {},
            { sort: { createdAt: -1 } },
        ).populate("senderId");
        // populate sender path with user details
        return {
            success: true,
            message: "messages fetched successsfuly",
            data: {
                messages: mongodbArrayConverter(messages),
                count,
                chat: mongodbObjectConverter(chat) as ChatDocument,
            },
        };
    },
);

const createChat = actionWrapper(
    async (
        type: "private" | "group",
        userIds: string[],
        details: {
            name?: string;
            photo?: string;
        },
    ): Promise<ActionReturnType<ChatEntity>> => {
        await initAction();
        if (type === "private" && userIds.length !== 2)
            throw new Error("private chat must have 2 users");
        if (type === "group" && userIds.length < 2)
            throw new Error("group chat must have at least 2 users");
        if (type === "private") {
            const chat = await ChatModel.findOne({
                type: "private",
                users: {
                    $all: [
                        { $elemMatch: { userId: userIds[0] } },
                        { $elemMatch: { userId: userIds[1] } },
                    ],
                },
            });
            if (chat)
                return {
                    success: true,
                    data: JSON.parse(JSON.stringify(chat)),
                    message: "private chat already exists",
                };
            // throw generateAPIError(
            //     "private chat already exists",
            //     errorCodes.ActionNotPermitted,
            // );
        }
        const userProfiles: any = [];
        const users = await Promise.all(
            userIds.map(async (userId) => {
                const profile = await UserModel.findOne({ _id: userId });
                if (!profile) throw new Error("userId is invalid");
                userProfiles.push(profile);
                return { unread: 0, userId: profile._id };
            }),
        );
        // create private chat reference in users
        if (type === "private") {
            console.log(userProfiles[0]._id);
            userProfiles[0].privateChatUsers.push(userProfiles[1]._id);
            userProfiles[1].privateChatUsers.push(userProfiles[0]._id);
            await userProfiles[0].save();
            await userProfiles[1].save();
        }
        const chat = new ChatModel({
            type,
            users,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (chat.type === "group") {
            chat.name = details.name ? details.name : "default group name";
            chat.icon = details.photo ? details.photo : "";
        }
        await chat.save();
        return {
            success: true,
            data: mongodbObjectConverter(chat) as ChatEntity,
            message: "chat created",
        };
    },
);

// const createMessageAction = actionWrapper(
//     async (
//         chatId: string,
//         message: { messageType: string; message: string },
//     ): Promise<ActionReturnType<null>> => {
//         await initAction();
//         const userId = (await authHelper()).uid;
//         const { message: messageResult } = await createMessage(
//             chatId,
//             userId,
//             message,
//         );
//         return {
//             success: true,
//             data: null,
//             message: "message created",
//         };
//     },
// );

export {
    getChats,
    getMessages,
    createChat,
    getUsers,
    // createMessageAction,
    // getSingleChat,
    getUsersInGroup,
};
