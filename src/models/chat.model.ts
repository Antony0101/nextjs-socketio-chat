import mongoose from "mongoose";
import { ExtractDocument, ExtractEntity } from "../lib/tsHelpers.js";

const ChatSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["private", "group"],
            required: true,
        },
        users: [
            {
                unread: {
                    type: Number,
                    default: 0,
                },
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                _id: false,
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
        },
        lastMessageAt: {
            type: Date,
        },
        icon: {
            type: String,
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const dummyModel = (false as true) && mongoose.model("chats", ChatSchema);
export type ChatModelType = typeof dummyModel;

export type ChatDocument = ExtractDocument<typeof ChatModel>;

export type ChatEntity = ExtractEntity<typeof ChatModel>;

const ChatModel: ChatModelType =
    mongoose.models.chats || mongoose.model("chats", ChatSchema);

export default ChatModel;
