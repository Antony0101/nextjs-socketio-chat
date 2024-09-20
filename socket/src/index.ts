import "./loadEnv.js";
import { createServer } from "node:http";
// import mongoose from "mongoose";
import connectDB from "./connectDb.js";
import setupWss from "./socketIO/socketIO.js";

const port = process.env.PORT || 3000;
connectDB();
const httpServer = createServer((req, res) => {
    res.end("Socket server is running");
});
setupWss(httpServer);

httpServer
    .once("error", (err) => {
        console.error(err);
        process.exit(1);
    })
    .listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
