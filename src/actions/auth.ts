"use server";
import type { ActionReturnType } from "@/actions/types";
import initAction from "@/lib/initAction";
import UserModel, { UserEntity } from "@/models/user.model";
import { error } from "console";

type InputType = {
    username: string;
    password: string;
};

async function loginAction(
    data: InputType,
): Promise<ActionReturnType<InputType>> {
    await initAction();
    return {
        success: true,
        message: "hello hello",
        data,
    };
}

type SignUpDataType = {
    username: string;
    password: string;
    confirm_password: string;
};

async function signUpAction(
    data: SignUpDataType,
): Promise<ActionReturnType<UserEntity | null>> {
    try {
        await initAction();
        const user = await UserModel.create({
            username: data.username,
            password: data.password,
            name: "Sample",
            lastSeen: new Date(),
        });
        return {
            success: true,
            data: user.toJSON(),
            message: "sign up is successful",
        };
    } catch (e: any) {
        return {
            success: false,
            data: null,
            message: e.message || "unkown server error",
        };
    }
}

export { loginAction, signUpAction };
