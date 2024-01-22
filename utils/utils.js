import fs from "node:fs/promises"; // Menggunakan fs.promises untuk operasi file async

export async function getData() {
  try {
    const data = await fs.readFile("./content/content.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Gagal membaca file:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}

export async function updateData(data) {
  try {
    await fs.writeFile("./content/content.json", JSON.stringify(data), "utf-8");
    console.log("Berhasil update");
  } catch (error) {
    console.error("Gagal menulis ke file:", error);
  }
}
