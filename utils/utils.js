import fs from "node:fs/promises"; // Menggunakan fs.promises untuk operasi file async
import { storage } from "../store/store.js";
import { Data, Name } from "@ndn/packet";
import { toUtf8 } from "@ndn/util";

export async function getData() {
  try {
    const data = await fs.readFile("./content/content.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Gagal membaca file:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}

export async function updateData(prefix, content) {
  try {
    // await fs.writeFile("./content/content.json", JSON.stringify(data), "utf-8");
    const data = new Data(
      new Name(prefix),
      Data.FreshnessPeriod(5000),
      toUtf8(content)
    );
    await storage(data);
    console.log("Berhasil update");
  } catch (error) {
    console.error("Gagal menulis ke file:", error);
  }
}
