# Catatan SVG

Semua ornamen (bintang 8 sudut, divider, sudut arabesque, daun) dan
ilustrasi mempelai ditulis **inline di `index.html`** — bukan file terpisah —
agar undangan tetap berfungsi saat dibuka langsung dari file lokal (`file://`),
di mana `fetch()` terhadap file SVG akan diblokir browser.

- Ornamen: blok `<svg><defs><symbol id="orn-...">` di bagian atas `<body>`,
  dipakai ulang lewat `<use href="#orn-star8" />` dsb.
- Ilustrasi mempelai: dua `<svg class="couple__art">` di seksi `#couple`.
- Warna ilustrasi mengikuti token di `css/variables.css`
  (`--skin`, `--champagne`, `--emerald-*`, `--gold`).

Jika ingin mengganti ilustrasi, edit langsung SVG di `index.html`
atau tempel SVG baru dengan struktur kelas yang sama
(`figure-float`, `fabric-sway`, `ornament-draw-path` untuk efek animasinya).
