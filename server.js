import express, { json } from "express";
import http from "node:http";
import cors from "cors";
import { updateData } from "./utils/utils.js";
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});
app.post("/new/prefix", async (req, res) => {
  const { prefix, content } = req.body;

  try {
    await updateData(prefix, content);
    res.json({
      message: "Berhasil menambahkan data",
    });
  } catch (error) {
    console.error("Gagal menambahkan data:", error);
    res.status(500).json({
      message: "Gagal menambahkan data",
      error: error.message,
    });
  }
});
server.listen(5000, () => console.log("Server is running"));
