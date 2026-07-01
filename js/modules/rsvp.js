/**
 * rsvp.js — form konfirmasi kehadiran + daftar ucapan.
 *
 * Penyimpanan:
 *  - config.rsvp.endpoint terisi → kirim ke Google Apps Script (POST)
 *    dan tampilkan daftar ucapan dari sheet (GET, butuh fungsi doGet
 *    di skrip — lihat README.md "Menghubungkan RSVP ke backend").
 *  - endpoint kosong / gagal dijangkau → localStorage (per-perangkat)
 *    sebagai cadangan, plus seedWishes dari config.
 */
const STORAGE_KEY = "wedding-rsvp-wishes";

export function init(config) {
  const form = document.getElementById("rsvp-form");
  const list = document.getElementById("wish-list");
  if (!form || !list) return;

  const select = document.getElementById("rsvp-attendance");
  const status = document.getElementById("rsvp-status");
  const countEl = document.getElementById("wish-count");
  const options = config.rsvp.attendanceOptions || [];
  const endpoint = (config.rsvp.endpoint || "").trim();

  // Isi pilihan kehadiran dari config
  if (select) {
    options.forEach(({ value, label }) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      select.appendChild(opt);
    });
  }

  const labelFor = (value) =>
    options.find((o) => o.value === value)?.label || value;

  const loadStored = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  };

  const save = (wishes) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      /* mode privat / storage penuh — daftar tetap tampil di halaman */
    }
  };

  let stored = loadStored();
  // Daftar dari backend; null berarti belum/gagal dimuat → pakai lokal
  let remoteWishes = null;

  const render = () => {
    const wishes =
      remoteWishes ?? [...stored, ...(config.rsvp.seedWishes || [])];
    list.replaceChildren(
      ...wishes.map(({ name, attendance, message }) => {
        const li = document.createElement("li");
        li.className = "wish";

        const head = document.createElement("div");
        head.className = "wish__head";

        const nameEl = document.createElement("span");
        nameEl.className = "wish__name";
        nameEl.textContent = name;

        const badge = document.createElement("span");
        badge.className = "wish__badge";
        badge.textContent = labelFor(attendance);

        const msg = document.createElement("p");
        msg.className = "wish__message";
        msg.textContent = message;

        head.append(nameEl, badge);
        li.append(head, msg);
        return li;
      })
    );
    if (countEl) countEl.textContent = `(${wishes.length})`;
  };

  // Ambil seluruh ucapan dari backend (doGet di Apps Script mengembalikan
  // array JSON [{timestamp, name, attendance, message}, ...])
  const loadRemote = async () => {
    if (!endpoint) return;
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("format tidak dikenal");
      remoteWishes = data
        .filter((w) => w && w.name && w.message)
        .reverse(); // baris terbaru di sheet tampil paling atas
      render();
    } catch {
      /* offline / doGet belum dipasang — tetap tampilkan data lokal */
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entry = {
      name: String(data.get("name") || "").trim(),
      attendance: String(data.get("attendance") || ""),
      message: String(data.get("message") || "").trim(),
      timestamp: new Date().toISOString(),
    };
    if (!entry.name || !entry.message) return;

    if (endpoint) {
      fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(entry),
      });
    }

    // Tampilkan langsung (optimistis) sambil menunggu backend mencatat
    if (remoteWishes) {
      remoteWishes = [entry, ...remoteWishes];
    } else {
      stored = [entry, ...stored];
      save(stored);
    }
    render();
    form.reset();

    // Segarkan dari backend agar daftar sinkron dengan sheet
    if (endpoint) setTimeout(loadRemote, 3000);

    if (status) {
      status.textContent = "Terima kasih, ucapan Anda telah terkirim ✦";
      setTimeout(() => (status.textContent = ""), 4000);
    }
  });

  render();
  loadRemote();

  // Sinkronkan daftar ucapan secara berkala (5 dtk) dan setiap kali
  // tab kembali aktif, agar perubahan di sheet (termasuk penghapusan)
  // terlihat tanpa perlu memuat ulang halaman.
  if (endpoint) {
    setInterval(loadRemote, 5000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) loadRemote();
    });
  }
}
