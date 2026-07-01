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
      fullName: "Ahmad Naufal Romiz",
      nickName: "Naufal",
      parents: "Putra dari Bpk. Ach. Sjamsul Djihat & Ibu Umi Kulsum",
      instagram: "",
      image: "assets/img/groom.png",
    },
    // Nama gabungan di hero & footer
    hashtag: "#InasNaufalMenikah",
  },

  // ---------- Tanggal utama (dipakai countdown & kalender) ----------
  // Format ISO dengan offset WIB (+07:00)
  weddingDate: "2026-11-14T08:00:00+07:00",
  weddingDateEnd: "2026-11-14T14:00:00+07:00",
  dateDisplay: "Sabtu, 14 November 2026",

  // ---------- Acara ----------
  events: [
    {
      name: "Akad Nikah",
      date: "Sabtu, 14 November 2026",
      time: "08.00 – 10.00 WIB",
      venue: "Masjid Agung Al-Azhar",
      address: "Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan",
      mapsLink: "https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta",
    },
    {
      name: "Resepsi",
      date: "Sabtu, 14 November 2026",
      time: "11.00 – 14.00 WIB",
      venue: "Balai Kartini",
      address: "Jl. Gatot Subroto Kav. 37, Jakarta Selatan",
      mapsLink: "https://maps.google.com/?q=Balai+Kartini+Jakarta",
    },
  ],

  // Embed Google Maps (ganti dengan embed URL lokasi asli:
  // Google Maps → Share → Embed a map → salin src iframe)
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2273570519246!2d106.79763107499058!3d-6.243482093744423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1720b2f9847%3A0x7972b16b2d305d10!2sAl-Azhar%20Great%20Mosque!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",

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

  // ---------- Kisah cinta ----------
  story: [
    {
      year: "2021",
      title: "Awal Bertemu",
      text: "Kami dipertemukan dalam sebuah kajian di kampus. Sebuah perkenalan singkat yang ternyata menjadi awal dari segalanya.",
    },
    {
      year: "2023",
      title: "Saling Mengenal",
      text: "Melalui perantara keluarga, kami menjalani proses ta'aruf dengan niat yang lurus dan hati yang mantap.",
    },
    {
      year: "2025",
      title: "Khitbah",
      text: "Keluarga besar kami bertemu, dan lamaran diterima dengan penuh syukur dan kebahagiaan.",
    },
    {
      year: "2026",
      title: "Menuju Halal",
      text: "Dengan izin Allah, kami melangkah menuju ikatan suci pernikahan. Mohon doa restu untuk perjalanan kami.",
    },
  ],

  // ---------- Galeri (ganti dengan foto asli, rasio bebas) ----------
  gallery: [
    { src: "https://placehold.co/600x800/0F3D2E/C9A227?text=Foto+1", alt: "Foto prewedding 1" },
    { src: "https://placehold.co/600x600/14503C/FAF7F0?text=Foto+2", alt: "Foto prewedding 2" },
    { src: "https://placehold.co/600x800/1B5E46/C9A227?text=Foto+3", alt: "Foto prewedding 3" },
    { src: "https://placehold.co/600x600/0F3D2E/FAF7F0?text=Foto+4", alt: "Foto prewedding 4" },
    { src: "https://placehold.co/600x800/14503C/C9A227?text=Foto+5", alt: "Foto prewedding 5" },
    { src: "https://placehold.co/600x600/1B5E46/FAF7F0?text=Foto+6", alt: "Foto prewedding 6" },
  ],

  // ---------- Amplop digital ----------
  gifts: [
    {
      bank: "Bank BCA",
      accountNumber: "1234567890",
      accountName: "Aisyah Putri Rahmadani",
    },
    {
      bank: "Bank Mandiri",
      accountNumber: "0987654321",
      accountName: "Muhammad Rizky Pratama",
    },
  ],
  giftAddress: {
    label: "Kirim Kado",
    recipient: "Rizky & Aisyah",
    address: "Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan 12110",
  },

  // ---------- Musik ----------
  // Ganti dengan file mp3 milikmu (letakkan di assets/audio/).
  // File bawaan adalah placeholder hening.
  music: {
    src: "assets/audio/music.wav",
    autoplayAfterOpen: true,
  },

  // ---------- RSVP ----------
  rsvp: {
    // TODO: isi endpoint Google Apps Script / Formspree untuk penyimpanan asli.
    // Lihat README.md bagian "Menghubungkan RSVP ke backend".
    endpoint: "",
    attendanceOptions: [
      { value: "hadir", label: "InsyaAllah Hadir" },
      { value: "tidak-hadir", label: "Berhalangan Hadir" },
      { value: "ragu", label: "Masih Ragu" },
    ],
    // Ucapan contoh yang tampil sebelum ada kiriman
    seedWishes: [
      {
        name: "Keluarga Besar",
        attendance: "hadir",
        message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khair. Selamat menempuh hidup baru!",
      },
    ],
  },
};
