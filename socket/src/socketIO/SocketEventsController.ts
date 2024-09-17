import { SocketInstance } from "./socketIOTypes.js";
import {
    createMessage,
    deleteMessage,
} from "./chat.internal.js";

const sendMessageEvent = async (
    socket: SocketInstance,
    data: any,
    callback: any,
) => {
    try {
        try {
            const { chatId, message, messageType } = data as {
                chatId: string;
                message: string;
                messageType: string;
            };
            const messageData = { messageType, message };
            const result = await createMessage(
                chatId,
                socket.data.session._id,
                messageData,
            );
            socket.to(result.room).emit("newMessage", result.message);

            callback({
                _id: result.message._id,
                chatId: result.message.chatId,
                createdAt: result.message.createdAt,
            });
        } catch (err: any) {
            console.log(err);
            return callback(null, err);
        }
    } catch (err: any) {
        // if client socket doen't have acknowledgement function then callback will be undefined. this catch block will handle that
        // and prevent server from crashing
        console.log(err);
    }
};

const deleteMessageEvent = async (
    socket: SocketInstance,
    data: any,
    callback: any,
) => {
    try {
        const messageId = data.messageId as string;
        const userId = data.userId as string;
        const result = await deleteMessage(messageId, userId);
        socket.to(result.room).emit("messageDeleted", result.messageId);

        callback({
            _id: result.messageId,
        });
    } catch (err: any) {
        console.log(err);
        return callback(null, err);
    }
};

const SocketEventsController = { sendMessageEvent, deleteMessageEvent };

export default SocketEventsController;
