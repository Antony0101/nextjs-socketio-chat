import mongoose, { Model } from "mongoose";
import { ExtractDocument, ExtractEntity } from "../../lib/tsHelpers";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        lastSeen: {
            type: Date,
            required: true,
        },
        tokens: [
            {
                tid: String,
                expiry: Date,
            },
        ],
        privateChatUsers: [String],
    },
    {
        timestamps: true,
    },
);

const dummyModel = (false as true) && mongoose.model("users", UserSchema);

export type UserModelType = typeof dummyModel;

const UserModel: UserModelType =
    mongoose.models.users || mongoose.model("users", UserSchema);

export type UserEntity = ExtractEntity<typeof UserModel>;

export type UserDocument = ExtractDocument<typeof UserModel>;

export default UserModel;
