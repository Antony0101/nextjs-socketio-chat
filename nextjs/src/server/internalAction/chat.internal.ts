import { Types } from "mongoose";
import UserModel, { UserEntity } from "../models/user.model";
import ChatModel from "../models/chat.model";
import MessageModel, { MessageEntity } from "../models/message.model";

const createMessage = async (
    chatId: string,
    userId: string,
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

const deleteMessage = async (
    messageId: string,
    userId: string,
): Promise<{ messageId: string; room: string }> => {
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

export {
    createMessage,
    deleteMessage,
    addMemberToGroup,
    removeMemberFromGroup,
};
