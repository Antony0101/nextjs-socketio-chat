import initAction from "@/lib/initAction";
import UserModel from "@/server/models/user.model";
import { verifyCookie } from "@/utils/helpers/authCookieChecker";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    await initAction();
    const headersList = headers();
    const token = headersList.get("authorization")?.split(" ")[1];
    const payload = await verifyCookie({ value: token } as any);
    if (!payload.authStatus) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await UserModel.findOne({ _id: payload.payload?.uid });
    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }
    const userData = {
        _id: user._id,
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
        lastSeen: user.lastSeen,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        privateChatUsers: user.privateChatUsers,
    };
    return NextResponse.json(
        {
            user: userData,
        },
        {
            status: 200,
        },
    );
}
