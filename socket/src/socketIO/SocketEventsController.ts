import { SocketInstance } from "./socketIOTypes.js";
import { createMessage, deleteMessage } from "./chat.internal.js";

const sendMessageEvent = async (
    socket: SocketInstance,
    data: any,
    callback: any
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
                messageData
            );
            socket.broadcast
                .to(result.room[0])
                .emit("newMessage", result.message);
            result.room[1] &&
                socket.broadcast
                    .to(result.room[1])
                    .emit("newMessage", result.message);

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

// // sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// // list socketid
// for (var socketid in io.sockets.sockets) {}
//  OR
// Object.keys(io.sockets.sockets).forEach((socketid) => {});

const deleteMessageEvent = async (
    socket: SocketInstance,
    data: any,
    callback: any
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
