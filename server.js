import express from "express";
import http from "node:http";
import cors from "cors";
import { router } from "./routes/namedRoutes.js";

const app = express();
const port = 5000;
const server = http.createServer(app);

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/api/named", router);

server.listen(port, () => console.log("server is running"));
