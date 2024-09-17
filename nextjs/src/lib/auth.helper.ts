import { UserDocument } from "../server/models/user.model";
import crypto from "crypto";
// import jwt from "jsonwebtoken";
import * as jose from "jose";
import bcrypt from "bcrypt";

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
const createJwt = async (payload: any, time?: string): Promise<string> => {
    const alg = "HS256";
    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .sign(new TextEncoder().encode(process.env.JWT || "abc"));
    // const token = jwt.sign(payload, process.env.JWT_SECRET || "abc", {
    //     expiresIn: time || "3d",
    // });
    return token;
};

const verifyJwt = async (token: string): Promise<any> => {
    const payload = await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT || "abc"),
    );
    // const payload = jwt.verify(token, process.env.JWT_SECRET || "abc");
    return payload.payload;
};

const hashPassword = async (password: string): Promise<string> => {
    const saltrounds = 12;
    const salt = await bcrypt.genSalt(saltrounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const comparePassword = async ({
    password,
    hash,
}: {
    password: string;
    hash: string;
}): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export { setTokenInDb, createJwt, verifyJwt, comparePassword, hashPassword };
