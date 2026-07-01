/**
 * rsvp.js — form konfirmasi kehadiran + daftar ucapan.
 *
 * Penyimpanan saat ini: localStorage (mock, per-perangkat).
 * TODO: hubungkan ke backend nyata (Google Apps Script / Formspree).
 *   1. Isi config.rsvp.endpoint dengan URL endpoint kamu.
 *   2. Di handler submit di bawah, kirim `entry` via fetch(endpoint, {method:"POST", ...}).
 *   3. Saat load, ambil daftar ucapan dari endpoint alih-alih localStorage.
 *   Lihat README.md bagian "Menghubungkan RSVP ke backend" untuk contoh lengkap.
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

  const render = () => {
    const wishes = [...stored, ...(config.rsvp.seedWishes || [])];
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

    // TODO: jika config.rsvp.endpoint terisi, kirim `entry` ke backend di sini.
    stored = [entry, ...stored];
    save(stored);
    render();
    form.reset();

    if (status) {
      status.textContent = "Terima kasih, ucapan Anda telah terkirim ✦";
      setTimeout(() => (status.textContent = ""), 4000);
    }
  });

  render();
}
