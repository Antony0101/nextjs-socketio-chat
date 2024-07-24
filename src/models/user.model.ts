import mongoose, { Model } from "mongoose";
import { ExtractDocument, ExtractEntity } from "../lib/tsHelpers";

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
    },
    {
        timestamps: true,
    },
);

export type UserModelType = Model<typeof UserSchema>;

const UserModel: UserModelType =
    mongoose.models.users || mongoose.model("users", UserSchema);

export type UserEntity = ExtractEntity<typeof UserModel>;

export type UserDocument = ExtractDocument<typeof UserModel>;

export default UserModel;
