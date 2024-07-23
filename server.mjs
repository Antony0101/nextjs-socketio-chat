import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import mongoose from "mongoose";
// import connectDB from "./src/lib/connectDb";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    mongoose
        .connect(process.env.DATABASE_URL || "")
        .then(() => {})
        .catch((err) => console.error("Error connecting to MongoDB", err));
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        if (dev) {
            console.log("new socket client connected");
        }
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
