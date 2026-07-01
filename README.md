# Undangan Pernikahan Digital

Undangan pernikahan single-page bergaya **Elegant Classic + Ornamen Islami**
(emerald, ivory, emas). Statis murni — HTML/CSS/JS tanpa build step, tanpa npm.
Bisa dibuka langsung dari file lokal maupun di-hosting statis.

## Struktur

```
├── index.html          # kerangka halaman + SVG ornamen & ilustrasi inline
├── config.js           # ⭐ SEMUA konten yang bisa diedit ada di sini
├── css/
│   ├── variables.css   # token desain (warna, font, spasi)
│   ├── base.css        # reset + tipografi
│   ├── components.css  # kartu, tombol, nav, lightbox
│   ├── sections.css    # layout per seksi
│   └── animations.css  # keyframes + reveal
├── js/
│   ├── main.js         # orkestrasi + render konten dari config
│   └── modules/        # opening, countdown, reveal, rsvp, gallery, clipboard, guest
└── assets/
    ├── audio/music.wav # placeholder hening — ganti dengan musikmu
    └── svg/            # catatan: SVG di-inline di index.html
```

## Mengedit konten (cukup `config.js`)

Semua nama, tanggal, lokasi, ayat, kisah cinta, galeri, rekening, dan teks
lain ada di [config.js](config.js). Tidak perlu menyentuh HTML/CSS/JS.

Yang paling sering diubah:

| Bagian | Kunci di config.js |
|---|---|
| Nama mempelai & orang tua | `couple.bride`, `couple.groom` |
| Tanggal akad (countdown & kalender) | `weddingDate`, `weddingDateEnd`, `dateDisplay` |
| Akad & resepsi | `events[]` |
| Peta | `mapEmbedUrl` (Google Maps → Share → *Embed a map* → salin nilai `src` iframe) |
| Kisah cinta | `story[]` |
| Foto galeri | `gallery[]` — ganti URL placehold.co dengan foto asli |
| Rekening amplop digital | `gifts[]` |
| Musik | `music.src` |

Warna & font diatur lewat token di [css/variables.css](css/variables.css)
(`--emerald`, `--gold`, `--ivory`, `--font-serif`, dst).

## Nama tamu di URL

Tambahkan `?to=` pada tautan yang dibagikan:

```
https://domainmu.com/?to=Bapak+Ahmad+Sekeluarga
```

Tanpa parameter, nama tamu default: **"Tamu Undangan"**.

## Mengganti musik

Dua cara, diatur di `config.js` bagian `music`:

**1. Streaming dari YouTube (tanpa file lokal)** — isi `youtubeId` dengan ID
video (bagian setelah `watch?v=` pada URL). Contoh: untuk
`youtube.com/watch?v=mHpTdsBbYRM`, isi `youtubeId: "mHpTdsBbYRM"`.
Musik di-stream lewat pemutar YouTube tersembunyi.

Catatan penting untuk opsi YouTube:
- Butuh koneksi internet di sisi tamu (kuota terpakai lebih besar
  daripada mp3, karena YouTube tetap mengirim video).
- Hanya berfungsi jika pemilik video mengizinkan embed. Bila video
  dihapus/diblokir, undangan otomatis memutar file `src` sebagai cadangan.
- Ada jeda ± 1–3 detik saat pemutar dimuat pertama kali.

**2. File mp3 lokal (paling andal)** — kosongkan `youtubeId` (`""`), letakkan
file di `assets/audio/`, lalu isi `src: "assets/audio/lagu.mp3"`.
File bawaan `music.wav` hanya placeholder.

Gunakan musik yang bebas royalti / berlisensi. Musik diputar saat tamu
menekan "Buka Undangan" (kebijakan autoplay browser mensyaratkan interaksi),
dan bisa dimatikan lewat tombol bulat di kanan bawah.

## Mengganti ilustrasi mempelai

Seksi "Mempelai" menampilkan gambar PNG dari `config.js`:

```js
bride: { ..., image: "assets/img/bride.png" },
groom: { ..., image: "assets/img/groom.png" },
```

1. Siapkan dua gambar (ilustrasi chibi, kartun, atau foto) — PNG dengan
   latar transparan paling bagus, rasio tegak ± 3:4.
2. Simpan sebagai `assets/img/bride.png` dan `assets/img/groom.png`
   (atau nama lain, lalu sesuaikan `image` di `config.js`).
3. Gambar otomatis tampil di dalam bingkai lengkung emas, terpotong
   mengikuti bentuk mihrab. Selama file belum ada, bingkai menampilkan
   inisial nama sebagai fallback.

## Mengganti foto galeri

Ganti entri `gallery[]` di `config.js` dengan path foto asli, mis.:

```js
gallery: [
  { src: "assets/img/foto-1.jpg", alt: "Prewedding di pantai" },
  ...
],
```

Kompres foto dulu (≤ 300 KB per foto, lebar ± 1200px cukup) agar tetap ringan.

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub (mis. `undangan-nikah`).
2. Push seluruh isi folder ini:
   ```bash
   git init
   git add .
   git commit -m "Undangan pernikahan"
   git branch -M main
   git remote add origin https://github.com/USERNAME/undangan-nikah.git
   git push -u origin main
   ```
3. Di GitHub: **Settings → Pages → Build and deployment**
   - Source: *Deploy from a branch*
   - Branch: `main`, folder `/ (root)` → **Save**
4. Tunggu ± 1 menit. Undangan tersedia di
   `https://USERNAME.github.io/undangan-nikah/?to=Nama+Tamu`

## Deploy ke Vercel

Cara termudah (tanpa CLI):

1. Push repo ke GitHub (langkah di atas).
2. Buka [vercel.com](https://vercel.com) → **Add New → Project** → import repo.
3. Framework Preset: **Other**. Biarkan Build Command & Output kosong
   (tidak ada build). → **Deploy**.
4. Undangan tersedia di `https://nama-proyek.vercel.app/?to=Nama+Tamu`

Dengan CLI:

```bash
npm i -g vercel   # sekali saja
vercel            # dari folder proyek, ikuti prompt
vercel --prod
```

## Menghubungkan RSVP ke backend

Saat ini ucapan disimpan di `localStorage` (hanya terlihat di perangkat
pengirim — mock). Untuk penyimpanan terpusat:

### Opsi A — Google Apps Script (gratis, ke Google Sheets)

1. Buat Google Sheet baru → **Extensions → Apps Script**, tempel:
   ```js
   // Menerima kiriman RSVP dari undangan
   function doPost(e) {
     const row = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
       .appendRow([row.timestamp, row.name, row.attendance, row.message]);
     return ContentService.createTextOutput("ok");
   }

   // Mengembalikan seluruh ucapan agar tampil di undangan
   function doGet() {
     const rows = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
       .getDataRange().getValues();
     const wishes = rows
       .filter((r) => r[1] && r[3])
       .map((r) => ({
         timestamp: r[0],
         name: String(r[1]),
         attendance: String(r[2]),
         message: String(r[3]),
       }));
     return ContentService.createTextOutput(JSON.stringify(wishes))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
2. **Deploy → New deployment → Web app** dengan pengaturan:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** (bukan "Anyone with a Google Account" —
     opsi itu menyebabkan error 401 bagi tamu)
3. Salin URL web app (berakhiran `/exec`) ke `rsvp.endpoint` di `config.js`.
   Frontend otomatis mengirim RSVP (POST) dan menampilkan seluruh ucapan
   dari sheet (GET). Bila endpoint tidak terjangkau, undangan kembali
   memakai penyimpanan lokal per-perangkat.
4. Setiap kali mengubah kode skrip, buka **Deploy → Manage deployments →
   ✏️ → Version: New version → Deploy** (mengedit deployment yang sama
   menjaga URL tetap; deployment BARU menghasilkan URL berbeda).

### Opsi B — Formspree

1. Buat form di [formspree.io](https://formspree.io) → salin endpoint
   (`https://formspree.io/f/xxxx`) ke `rsvp.endpoint`.
2. Kirim `entry` ke endpoint tersebut dengan `fetch` seperti di atas
   (tanpa `mode: "no-cors"`, header `Accept: application/json`).

## Menjalankan secara lokal

Jalankan server statis sederhana dari folder proyek:

```bash
python3 -m http.server 8000
# buka http://localhost:8000/?to=Nama+Tamu
```

> **Catatan:** membuka `index.html` langsung (double-click / `file://`) tidak
> didukung penuh — browser memblokir ES module lewat protokol `file://`,
> sehingga konten tidak terisi. Halaman akan menampilkan petunjuk ini juga.
> Gunakan server lokal di atas, atau langsung deploy.
