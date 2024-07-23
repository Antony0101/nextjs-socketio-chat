"use server";
import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || "";

if (!DATABASE_URL) {
    throw new Error(
        "Please define the DATABASE_URL environment variable inside .env.local",
    );
}

interface Global {
    mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
    };
}

declare const global: Global;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log("herees sfdfdfdsf");
        return cached.conn;
    }
    console.log("here");
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        console.log("connecting to db...");
        console.log("hdjasdh", mongoose);
        cached.promise = mongoose
            .connect(DATABASE_URL, opts)
            .then((mongoose: any) => {
                return mongoose;
            });
    }
    console.log("hdfdfhfdsfhd");
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
