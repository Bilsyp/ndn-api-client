import express from "express";
import {
  deletetDataByNamed,
  getDataByNamed,
  postData,
} from "../controllers/namedControllers.js";

const router = express.Router();
router.post("/find/named", getDataByNamed).post("/new/named", postData);
router.delete("/delete/named/:name", deletetDataByNamed);
export { router };
