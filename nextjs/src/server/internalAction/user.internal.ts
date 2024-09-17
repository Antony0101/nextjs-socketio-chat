import UserModel, { UserEntity } from "../models/user.model";
import initAction from "../../lib/initAction";

export async function getUserDetails(userId: string): Promise<UserEntity> {
    initAction();
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        throw new Error("User not found");
    }
    return user.toObject();
}
