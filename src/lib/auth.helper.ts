import { UserDocument } from "../models/user.model";
import crypto from "crypto";
import jwt from "jsonwebtoken";

async function setTokenInDb(
    userprofile: UserDocument,
    expiry: Date,
): Promise<string> {
    const tid = crypto.randomUUID();
    if (userprofile.tokens.length >= 10) {
        userprofile.tokens.shift();
    }
    userprofile.tokens.push({
        tid,
        expiry,
    });
    await userprofile.save();
    return tid;
}
const createJwt = (payload: any, time?: string): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "abc", {
        expiresIn: time || "3d",
    });
    return token;
};

const verifyJwt = (token: string): any => {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "abc");
    return payload;
};

export { setTokenInDb, createJwt, verifyJwt };
