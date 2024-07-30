"use server";
import type { ActionReturnType } from "@/actions/types";
import initAction from "@/lib/initAction";
import UserModel, { UserEntity } from "@/models/user.model";
import actionWrapper from "@/lib/wrappers/serverActionWrapper";
import {
    comparePassword,
    createJwt,
    hashPassword,
    setTokenInDb,
} from "@/lib/auth.helper";
import { cookies } from "next/headers";
type InputType = {
    username: string;
    password: string;
};

const loginAction = actionWrapper(
    async (data: InputType): Promise<ActionReturnType<UserEntity>> => {
        await initAction();
        const user = await UserModel.findOne({ username: data.username });
        if (!user) {
            throw new Error("username or password is wrong");
        }
        const isPasswordCorrect = await comparePassword(
            user.password,
            data.password,
        );
        if (!isPasswordCorrect) {
            throw new Error("username or password is wrong");
        }
        const token = await setTokenInDb(
            user,
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        );
        const payload = {
            uid: user._id,
            tid: token,
        };
        const jwt = createJwt(payload, "3d");
        cookies().set("auth", jwt, { maxAge: 1000 * 60 * 60 * 24 * 4 });
        return {
            success: true,
            data: JSON.parse(JSON.stringify(user)),
            message: "sign in is successful",
        };
    },
);

type SignUpDataType = {
    username: string;
    password: string;
    confirm_password: string;
};

const signUpAction = actionWrapper(
    async (data: SignUpDataType): Promise<ActionReturnType<UserEntity>> => {
        await initAction();
        const userExist = await UserModel.findOne({ username: data.username });
        if (userExist) {
            throw new Error("username already exist");
        }
        const password = await hashPassword(data.password);
        const user = await UserModel.create({
            username: data.username,
            password: password,
            name: "Default Name",
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
        cookies().set("auth", jwt, { maxAge: 1000 * 60 * 60 * 24 * 4 });
        return {
            success: true,
            data: JSON.parse(JSON.stringify(user)),
            message: "sign up is successful",
        };
    },
);

export { loginAction, signUpAction };
