import mongoose from "mongoose";
import { ExtractDocument, ExtractEntity } from "../../lib/tsHelpers.js";

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chats",
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        seen: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "auths",
                    required: true,
                },
                seenAt: {
                    type: Date,
                    required: true,
                },
            },
        ],
        messageType: {
            type: String,
            enum: ["text", "image", "video", "audio", "file"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

MessageSchema.index({ createdAt: 1, chatId: 1 });

const dummyModel = (false as true) && mongoose.model("messages", MessageSchema);

export type MessageModelType = typeof dummyModel;

export type MessageDocument = ExtractDocument<typeof MessageModel>;

export type MessageEntity = ExtractEntity<typeof MessageModel>;

const MessageModel: MessageModelType =
    mongoose.models.messages || mongoose.model("messages", MessageSchema);

export default MessageModel;
