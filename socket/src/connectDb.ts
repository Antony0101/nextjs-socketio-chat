import mongoose from "mongoose";

const DATABASE_URL =
    process.env.DATABASE_URL ||
    "mongodb+srv://tony:tony@cluster0.owtnv.mongodb.net/chat_app_next?retryWrites=true&w=majority";

if (!DATABASE_URL) {
    throw new Error(
        "Please define the DATABASE_URL environment variable inside .env"
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
        return cached.conn;
    }
    if (!cached.promise) {
        console.log("connecting to db...");
        cached.promise = mongoose
            .connect(DATABASE_URL)
            .then((mongoose: any) => {
                console.log("connected to db");
                return mongoose;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
