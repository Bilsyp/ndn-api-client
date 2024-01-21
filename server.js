import { Data, Name } from "@ndn/packet";
import { connection } from "./src/connection/connection.js";
import express from "express";
import cors from "cors";
import http from "http";
import { producing } from "./src/produce/produce.js";
import { consume } from "./src/consume/consume.js";
const app = express();
const server = http.createServer(app);
const port = 5000;

await connection();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    await consume();
    res.json({
      message: "Hello",
    });
  } catch (error) {
    res.json(error);
  }
});

app.post("/new/note", async (req, res) => {
  const data = req.body;
  if (data) {
    console.log(data);
    const test = await producing(
      data.prefix,
      JSON.stringify({ content: data.message })
    );
    res.status(200).json({
      message: "ok",
    });
  }
});
server.listen(port, () => console.log("server is running"));
