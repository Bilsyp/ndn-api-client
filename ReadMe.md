# Membuat Prefix Name Dari Client

## Tech

- API (Application Programming Interface)

- NDN (Named Data Network)

- NDNTS (Library Named Data Network)

Dalam konteks teknis, klien akan mengirimkan permintaan ke server melalui API untuk membuat, menghapus, atau memperbarui prefix name. API hanya dapat diakses dari sisi klien, memungkinkan komunikasi satu arah dari klien ke server. Pengiriman data tetap menggunakan **NDN** dari server ke klien.

## Required

Program ini diharapkan dijalankan di sistem operasi Linux atau WSL (Windows Subsystem for Linux) untuk pengguna Windows. Pastikan lingkungan eksekusi sesuai dengan salah satu dari kedua opsi tersebut agar program dapat berjalan dengan baik.

## Jalankan

### Clone Repository

```bash
git clone https://github.com/Bilsyp/NDN-Server
```

### Install Dependensi

```bash
npm install
```

```bash
npm install -g pm2
```

**OR**

```bash
pnpm install
```

### Run

```bash
pm2 start produce.js --name produce --watch ~/ndn-server/content/content.json
```

```bash
npm run dev
```
