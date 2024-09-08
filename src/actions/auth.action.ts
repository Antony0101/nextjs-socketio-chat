"use server";
import type { ActionReturnType } from "@/actions/types.action";
import initAction from "@/lib/initAction";
import UserModel, { UserEntity } from "@/models/user.model";
import actionWrapper from "@/lib/wrappers/serverActionWrapper";
import {
    comparePassword,
    createJwt,
    hashPassword,
    setTokenInDb,
    verifyJwt,
} from "@/lib/auth.helper";
import { cookies } from "next/headers";
import { mongodbObjectConverter } from "@/utils/helpers/mongodbObjectConverter";
type InputType = {
    username: string;
    password: string;
};

import { imageList, folderName } from "@/utils/imageList";

const loginAction = actionWrapper(
    async (data: InputType): Promise<ActionReturnType<UserEntity>> => {
        await initAction();
        const user = await UserModel.findOne({ username: data.username });
        if (!user) {
            throw new Error("username or password is wrong");
        }
        const isPasswordCorrect = await comparePassword({
            password: data.password,
            hash: user.password,
        });
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
        const jwt = await createJwt(payload, "3d");
        cookies().set("auth", jwt, { maxAge: 1000 * 60 * 60 * 24 * 4 });
        return {
            success: true,
            data: mongodbObjectConverter(user) as UserEntity,
            message: "sign in is successful",
        };
    },
);

type SignUpDataType = {
    name: string;
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
        const profilePicture =
            imageList[Math.floor(Math.random() * imageList.length)];
        const user = await UserModel.create({
            username: data.username,
            password: password,
            name: data.name,
            lastSeen: new Date(),
            profilePicture: folderName + profilePicture,
        });
        const token = await setTokenInDb(
            user,
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        );
        const payload = {
            uid: user._id,
            tid: token,
        };
        const jwt = await createJwt(payload, "3d");
        cookies().set("auth", jwt, { maxAge: 1000 * 60 * 60 * 24 * 4 });
        return {
            success: true,
            data: mongodbObjectConverter(user) as UserEntity,
            message: "sign up is successful",
        };
    },
);

const getAuthUser = async () => {
    try {
        const cookie = cookies().get("auth");
        if (!cookie) {
            throw new Error("unauthorized");
        }
        if (!cookie.value) {
            throw new Error("unauthorized");
        }
        console.log("cookie", cookie);
        const payload = await verifyJwt(cookie.value);
        return {
            success: true,
            data: payload,
            message: "user is authenticated",
        };
    } catch (e: any) {
        return {
            success: false,
            data: null,
            message: e.message || "unauthorized",
        };
    }
};

const getAuthUserDetails = async () => {
    try {
        const cookie = cookies().get("auth");
        if (!cookie) {
            throw new Error("unauthorized");
        }
        if (!cookie.value) {
            throw new Error("unauthorized");
        }
        const payload = await verifyJwt(cookie.value);
        const user = await UserModel.findById(payload.uid);
        if (!user) {
            throw new Error("user not found");
        }
        return {
            success: true,
            data: mongodbObjectConverter(user) as UserEntity,
            message: "user is authenticated",
        };
    } catch (e: any) {
        return {
            success: false,
            data: null,
            message: e.message || "unauthorized",
        };
    }
};

const signOutAction = actionWrapper(
    async (): Promise<ActionReturnType<null>> => {
        cookies().set("auth", "", { maxAge: 0 });
        return {
            success: true,
            data: null,
            message: "sign out is successful",
        };
    },
);

export { loginAction, signUpAction, getAuthUser, signOutAction };
