"use server";
import type { ActionReturnType } from "@/actions/types";
import initAction from "@/lib/initAction";
import UserModel, { UserEntity } from "@/models/user.model";
import actionWrapper from "@/lib/wrappers/serverActionWrapper";
import { createJwt, setTokenInDb } from "@/lib/auth.helper";
import { cookies } from "next/headers";
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

const signUpAction = actionWrapper(
    async (data: SignUpDataType): Promise<ActionReturnType<UserEntity>> => {
        await initAction();
        const user = await UserModel.create({
            username: data.username,
            password: data.password,
            name: "Sample",
            lastSeen: new Date(),
        });
        const token = await setTokenInDb(
            user,
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        );
        const payload = {
            uid: user._id,
            tid: token,
        };
        const jwt = createJwt(payload, "3d");
        cookies().set("auth", jwt);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(user)),
            message: "sign up is successful",
        };
    },
);

export { loginAction, signUpAction };
