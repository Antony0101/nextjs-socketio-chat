"use server";
import { Types } from "mongoose";
import UserModel, { UserEntity } from "../models/user.model";
import ChatModel, { ChatDocument, ChatEntity } from "../models/chat.model";
import MessageModel, {
    MessageDocument,
    MessageEntity,
} from "../models/message.model";
import { cookies } from "next/headers";
import initAction from "@/lib/initAction";
import actionWrapper from "@/lib/wrappers/serverActionWrapper";
import { ActionReturnType } from "./types.action";
import { JsonWebTokenError } from "jsonwebtoken";
import {
    mongodbArrayConverter,
    mongodbObjectConverter,
    mongodbRecursiveObjectConverter,
} from "@/utils/helpers/mongodbObjectConverter";
import { getAuthUser } from "./auth.action";

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
    async (userId: string): Promise<ActionReturnType<UserEntity[]>> => {
        await initAction();
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

const getChats = actionWrapper(
    async (): Promise<ActionReturnType<ChatEntity[]>> => {
        initAction();
        const { data } = await getAuthUser();
        const userId = data?.uid;
        console.log(userId);
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

const getMessages = async (
    chatId: Types.ObjectId,
    userId: Types.ObjectId,
    pageNo: number,
    pageSize: number,
): Promise<{
    messages: MessageDocument[];
    count: number;
    chat: ChatDocument;
}> => {
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
    )
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .populate("senderProfile");
    // populate sender path with user details
    return { messages, count, chat };
};

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
            chat.icon = details.photo ? details.photo : "default group icon";
        }
        await chat.save();
        return {
            success: true,
            data: mongodbObjectConverter(chat) as ChatEntity,
            message: "chat created",
        };
    },
);

const createMessage = async (
    chatId: Types.ObjectId,
    userId: Types.ObjectId,
    message: { messageType: string; message: string },
): Promise<{
    message: MessageEntity & { senderProfile?: any };
    room: string;
}> => {
    const profile = await UserModel.findOne({ _id: userId });
    if (!profile) throw new Error("userId is invalid");
    const messageDoc = new MessageModel({
        chatId,
        senderId: userId,
        messageType: message.messageType,
        message: message.message,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await messageDoc.save();
    // update chat lastMessageAt
    const chat = await ChatModel.findOneAndUpdate(
        { _id: chatId },
        {
            $set: {
                lastMessage: messageDoc._id,
                lastMessageAt: new Date(),
            },
        },
    );
    const messageDocObj: MessageEntity & { senderProfile?: any } =
        messageDoc.toObject();
    messageDocObj.senderProfile = profile as unknown as Types.ObjectId;
    if (!chat) throw new Error("chatId is invalid");
    let socketroom = `to-${chatId.toString()}`;
    if (chat.type === "private") {
        const index = chat.users.findIndex((obj) => {
            return obj.userId?.toString() !== userId.toString();
        });
        socketroom = `to-${chat.users[index].userId?.toString()}`;
    }
    return { message: messageDocObj, room: socketroom };
};

const addMemberToGroup = async (
    chatId: Types.ObjectId,
    userId: Types.ObjectId,
): Promise<{ room: string }> => {
    const chat = await ChatModel.findOne({ _id: chatId });
    if (!chat) throw new Error("chatId is invalid");
    if (chat.type !== "group") throw new Error("chat is not a group chat");
    const index = chat.users.findIndex((obj) => {
        return obj.userId?.toString() === userId.toString();
    });
    if (index !== -1) throw new Error("user is already a member of this group");
    const profile = await UserModel.findOne({ _id: userId });
    if (!profile) throw new Error("userId is invalid");
    chat.users.push({ unread: 0, userId: profile._id });
    await chat.save();
    return { room: `to-${chat.users[index].userId?.toString()}` };
};

const removeMemberFromGroup = async (
    chatId: Types.ObjectId,
    userId: Types.ObjectId,
) => {
    const chat = await ChatModel.findOne({ _id: chatId });
    if (!chat) throw new Error("chatId is invalid");
    if (chat.type !== "group") throw new Error("chat is not a group chat");
    const index = chat.users.findIndex((obj) => {
        return obj.userId?.toString() === userId.toString();
    });
    if (index === -1) throw new Error("user is not a member of this group");
    chat.users.splice(index, 1);
    await chat.save();
    return { room: `to-${chat.users[index].userId?.toString()}` };
};

const deleteMessage = async (
    messageId: Types.ObjectId,
    userId: Types.ObjectId,
): Promise<{ messageId: Types.ObjectId; room: string }> => {
    const message = await MessageModel.findOne({ _id: messageId });
    if (!message) throw new Error("messageId is invalid");
    if (message.senderId.toString() !== userId.toString())
        throw new Error("userId is not authorized to delete this message");
    const chat = await ChatModel.findOne({ _id: message.chatId });
    if (!chat) throw new Error("chatId is invalid");
    if (chat.lastMessage?.toString() === messageId.toString()) {
        const lastMessage = await MessageModel.findOne(
            { chatId: message.chatId },
            {},
            { sort: { createdAt: -1 } },
        ).skip(1);
        if (lastMessage) {
            await ChatModel.findOneAndUpdate(
                { _id: message.chatId },
                {
                    $set: {
                        lastMessage: lastMessage._id,
                        lastMessageAt: lastMessage.createdAt,
                    },
                },
            );
        } else {
            await ChatModel.findOneAndUpdate(
                { _id: message.chatId },
                { $unset: { lastMessage: "", lastMessageAt: "" } },
            );
        }
    }
    await MessageModel.deleteOne({ _id: messageId });
    // if(message.messageType === "image"){
    //     // delete image from s3
    // }
    if (chat.type === "group") {
        return { messageId: messageId, room: `to-${chat._id.toString()}` };
    }
    const index = chat.users.findIndex((obj) => {
        return obj.userId?.toString() !== userId.toString();
    });
    return {
        messageId: messageId,
        room: `to-${chat.users[index].userId?.toString()}`,
    };
};

export {
    getChats,
    getMessages,
    createChat,
    createMessage,
    addMemberToGroup,
    removeMemberFromGroup,
    deleteMessage,
    getUsers,
    // getSingleChat,
};
