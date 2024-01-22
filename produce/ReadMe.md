# Kelemahan Overwrite

Kelemahan : overwrite terjadi ketika setiap kali ada penambahan data baru, produksi ulang **instance** dilakukan pada setiap **instance** yang telah berjalan sebelumnya, menyebabkan perubahan yang tidak pasti pada faceId. Meskipun faceId berubah, kontennya tetap tidak berubah.

```javascript
fs.readFile("../content/content.json", "utf-8", async (err, data) => {
  const content = JSON.parse(data);
  content.forEach(async (item) => {
    const check = await checkData(item.prefix);
    if (!check) {
      const data = new Produce(item.prefix, item.content);
      await data.produces(item.prefix);
      console.log("add route");
    } else {
      console.log(" route");
    }
  });
});
```

Mengharapkan content pada file content berubah bukan menjadi sebuah solusi yang baik untuk mengecek apakah prefix sudah di produksi atau belum.
