/**
 * ============================================================
 *  KONFIGURASI UNDANGAN — edit file ini saja.
 *  Semua teks, tanggal, lokasi, rekening, dan cerita ada di sini.
 *  Tidak perlu menyentuh HTML/CSS/JS untuk mengganti konten.
 * ============================================================
 */

export const CONFIG = {
  // ---------- Pasangan ----------
  couple: {
    bride: {
      fullName: "Inas Rasyidah",
      nickName: "Inas",
      parents: "Putri dari Bpk. Gigih Priyandoko & Ibu Amik Purbowati",
      instagram: "", // opsional, contoh: "https://instagram.com/username"
      // Ilustrasi/foto PNG (transparan lebih bagus). Letakkan file di assets/img/
      image: "assets/img/bride.png",
    },
    groom: {
      fullName: "Ahmad Naufal R",
      nickName: "Naufal",
      parents: "Putra dari Bpk. Ach. Sjamsul & Ibu Umi Kulsum",
      instagram: "",
      image: "assets/img/groom.png",
    },
    // Nama gabungan di hero & footer
    hashtag: "#InasNaufalMenikah",
  },

  // ---------- Tanggal utama (dipakai countdown & kalender) ----------
  // Format ISO dengan offset WIB (+07:00)
  weddingDate: "2026-08-09T08:00:00+07:00",
  weddingDateEnd: "2026-08-09T14:00:00+07:00",
  dateDisplay: "Ahad, 9 Agustus 2026",

  // ---------- Acara ----------
  events: [
    {
      name: "Akad Nikah",
      date: "Ahad, 9 Agustus 2026",
      // time: "08.00 – 10.00 WIB",
      venue: "Bebek Kerto Tunggulwulung",
      address: "Jl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang",
      mapsLink: "https://maps.app.goo.gl/rzCWErkp5FrxssyT8",
    },
    {
      name: "Resepsi",
      date: "Ahad, 9 Agustus 2026",
      time: "09.00 – 12.00 WIB",
      venue: "Bebek Kerto Tunggulwulung",
      address: "Jl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang",
      mapsLink: "https://maps.app.goo.gl/rzCWErkp5FrxssyT8",
    },
  ],

  // Embed Google Maps (ganti dengan embed URL lokasi asli:
  // Google Maps → Share → Embed a map → salin src iframe)
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.729004082412!2d112.60020467700875!3d-7.923348692100324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78835b8c7383b5%3A0x921442d6296f0f7b!2sBebek%20Kerto%20tunggulwulung!5e0!3m2!1sen!2sid!4v1782954311421!5m2!1sen!2sid",

  // ---------- Ayat ----------
  verse: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation:
      "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”",
    source: "QS. Ar-Rum: 21",
  },

  // ---------- Teks pembuka & penutup ----------
  text: {
    coverEyebrow: "The Wedding of",
    coverGuestLabel: "Kepada Yth. Bapak/Ibu/Saudara/i",
    coverButton: "Buka Undangan",
    defaultGuest: "Tamu Undangan",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    heroIntro:
      "Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:",
    closingTitle: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
    closingNote:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.",
    footerThanks: "Terima kasih atas doa dan restunya",
  },

  // ---------- Kisah / kata pengantar ----------
  story: {
    title: "Bismillah Menuju Ibadah Terpanjang",
    text: "Tiada yang kebetulan dalam setiap pertemuan. Atas izin Allah SWT, doa-doa yang dipanjatkan, ikhtiar yang dijalankan, serta restu kedua keluarga mengantarkan kami pada hari yang penuh syukur ini. Dengan rendah hati, kami memohon doa agar langkah kecil kami menjadi awal keluarga yang sakinah, mawaddah, wa rahmah.",
  },

  // // ---------- Galeri (ganti dengan foto asli, rasio bebas) ----------
  // gallery: [
  //   { src: "https://placehold.co/600x800/0F3D2E/C9A227?text=Foto+1", alt: "Foto prewedding 1" },
  //   { src: "https://placehold.co/600x600/14503C/FAF7F0?text=Foto+2", alt: "Foto prewedding 2" },
  //   { src: "https://placehold.co/600x800/1B5E46/C9A227?text=Foto+3", alt: "Foto prewedding 3" },
  //   { src: "https://placehold.co/600x600/0F3D2E/FAF7F0?text=Foto+4", alt: "Foto prewedding 4" },
  //   { src: "https://placehold.co/600x800/14503C/C9A227?text=Foto+5", alt: "Foto prewedding 5" },
  //   { src: "https://placehold.co/600x600/1B5E46/FAF7F0?text=Foto+6", alt: "Foto prewedding 6" },
  // ],

  // ---------- Amplop digital ----------
  gifts: [
    {
      bank: "Bank BSI",
      accountNumber: "7180688298",
      accountName: "Inas Rasyidah",
    },
    {
      bank: "Bank Mandiri",
      accountNumber: "1440028022769",
      accountName: "Achmad Naufal Romiz",
    },
  ],
  giftAddress: {
    label: "Kirim Kado",
    recipient: "Ahmad Naufal Romiz",
    address: "Perumahan Griya Jemani, No. A20 (paling pojok sebelah musholla), Desa Pendem, Kec. Junrejo, Kota Batu - 65324",
  },

  // ---------- Musik ----------
  // Pilihan 1 (streaming, tanpa file lokal): isi youtubeId dengan ID video
  //   YouTube (bagian setelah "watch?v="). Musik di-stream lewat pemutar
  //   YouTube tersembunyi. Kosongkan ("") untuk menonaktifkan.
  // Pilihan 2 (file lokal): kosongkan youtubeId, isi src dengan path mp3
  //   di assets/audio/. src juga dipakai sebagai cadangan otomatis bila
  //   YouTube gagal dimuat (offline / embed diblokir).
  music: {
    youtubeId: "P4L6m40QCnw",
    src: "assets/audio/music.wav",
    autoplayAfterOpen: true,
  },

  // ---------- RSVP ----------
  rsvp: {
    // TODO: isi endpoint Google Apps Script / Formspree untuk penyimpanan asli.
    // Lihat README.md bagian "Menghubungkan RSVP ke backend".
    endpoint: "https://script.google.com/macros/s/AKfycbzyw2LFckcwH7P7mAx48vTLmzNHqQuKDnAnKXv2hzkBTSd_WujuqBpp5nOK9ILtuBKR6g/exec",
    attendanceOptions: [
      { value: "hadir", label: "InsyaAllah Hadir" },
      { value: "tidak-hadir", label: "Berhalangan Hadir" },
      { value: "ragu", label: "Masih Ragu" },
    ],
    // Ucapan contoh yang tampil sebelum ada kiriman
    // seedWishes: [
    //   {
    //     name: "Keluarga Besar",
    //     attendance: "hadir",
    //     message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khair. Selamat menempuh hidup baru!",
    //   },
    // ],
  },
};
