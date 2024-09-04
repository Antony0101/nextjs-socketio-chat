"use server";
import type { ActionReturnType } from "@/actions/types.action";
import initAction from "@/lib/initAction";
import UserModel, { UserEntity } from "@/models/user.model";
import actionWrapper from "@/lib/wrappers/serverActionWrapper";
import { mongodbObjectConverter } from "@/utils/helpers/mongodbObjectConverter";
import { authHelper } from "./helper.action";

type InputType = {
    username: string;
    name: string;
    // profilePicture: string;
};

const updateUserDetails = actionWrapper(
    async (data: InputType): Promise<ActionReturnType<UserEntity>> => {
        await initAction();
        const userId = (await authHelper()).uid;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            throw new Error("user not found");
        }
        user.username = data.username;
        user.name = data.name;
        // user.profilePicture = data.profilePicture;
        await user.save();
        return {
            success: true,
            data: mongodbObjectConverter(user) as UserEntity,
            message: "user profile updated successfully",
        };
    },
);

const getUserDetails = actionWrapper(
    async (): Promise<ActionReturnType<UserEntity>> => {
        await initAction();
        const userId = (await authHelper()).uid;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            throw new Error("user not found");
        }
        return {
            success: true,
            data: mongodbObjectConverter(user) as UserEntity,
            message: "user found",
        };
    },
);

export { getUserDetails, updateUserDetails };
