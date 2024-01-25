import asyncHandler from "express-async-handler";
import { Produce } from "../store/store.js";
import { runCommand } from "../utils/utils.js";
// todo insert Data
// type POST

const postData = asyncHandler(async (req, res) => {
  const data = req.body;
  if (data) {
    const store = new Produce(data.prefix, data.content);
    await store.insertData();
    res.status(200).json({
      message: "Post Data",
      data,
    });
  } else {
    res.status(400).json({
      message: "Something Wrong",
    });
  }
});
const getDataByNamed = asyncHandler(async (req, res) => {
  const data = req.body;
  if (data) {
    const store = new Produce(data.prefix, data.content);
    const result = await store.getData();
    res.status(200).json({
      message: "Find Data",
      result,
    });
  } else {
    res.status(400).json({
      message: "Something Wrong",
    });
  }
});

const deletetDataByNamed = asyncHandler(async (req, res) => {
  const { name } = req.params;
  if (name) {
    const store = new Produce(name);
    await store.deleteData();
    res.status(200).json({
      message: "deleted",
    });
  } else {
    res.status(400).json({
      message: "Something Wrong",
    });
  }
});

export { getDataByNamed, postData, deletetDataByNamed };
