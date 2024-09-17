"use server";
import connectDB from "./connectDb";

export default async function initAction() {
    await connectDB();
}
