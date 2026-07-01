# Catatan SVG

Semua ornamen (bintang 8 sudut, divider, sudut arabesque, daun) dan
ilustrasi mempelai ditulis **inline di `index.html`** — bukan file terpisah —
agar undangan tetap berfungsi saat dibuka langsung dari file lokal (`file://`),
di mana `fetch()` terhadap file SVG akan diblokir browser.

- Ornamen: blok `<svg><defs><symbol id="orn-...">` di bagian atas `<body>`,
  dipakai ulang lewat `<use href="#orn-star8" />` dsb.
- Ilustrasi mempelai: **gambar PNG** yang diletakkan di `assets/img/`
  (`bride.png` & `groom.png`), diatur lewat `couple.*.image` di `config.js`.
  Lihat README.md utama bagian "Mengganti ilustrasi mempelai".
