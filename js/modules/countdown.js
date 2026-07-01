/**
 * countdown.js — hitung mundur ke tanggal akad + link Google Calendar.
 * Angka berganti dengan transisi fade halus (kelas .is-flipping).
 */
export function init(config) {
  const grid = document.getElementById("countdown-grid");
  if (!grid) return;

  const target = new Date(config.weddingDate).getTime();
  if (Number.isNaN(target)) return;

  const nums = {
    days: grid.querySelector('[data-unit="days"]'),
    hours: grid.querySelector('[data-unit="hours"]'),
    minutes: grid.querySelector('[data-unit="minutes"]'),
    seconds: grid.querySelector('[data-unit="seconds"]'),
  };
  const doneEl = document.getElementById("countdown-done");
  const dateEl = document.getElementById("countdown-date");
  if (dateEl) dateEl.textContent = config.dateDisplay;

  const setDigit = (el, value) => {
    if (!el) return;
    const text = String(value).padStart(2, "0");
    if (el.textContent === text) return;
    el.textContent = text;
    el.classList.remove("is-flipping");
    // paksa reflow agar animasi bisa diputar ulang
    void el.offsetWidth;
    el.classList.add("is-flipping");
  };

  let timer;
  const tick = () => {
    const diff = target - Date.now();

    if (diff <= 0) {
      clearInterval(timer);
      grid.hidden = true;
      if (doneEl) doneEl.hidden = false;
      return;
    }

    setDigit(nums.days, Math.floor(diff / 86400000));
    setDigit(nums.hours, Math.floor(diff / 3600000) % 24);
    setDigit(nums.minutes, Math.floor(diff / 60000) % 60);
    setDigit(nums.seconds, Math.floor(diff / 1000) % 60);
  };

  tick();
  timer = setInterval(tick, 1000);

  // ---- Link "Simpan ke Google Calendar" ----
  const btnCal = document.getElementById("btn-calendar");
  if (btnCal) {
    const fmt = (iso) =>
      new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const { bride, groom } = config.couple;
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set(
      "text",
      `Pernikahan ${groom.nickName} & ${bride.nickName}`
    );
    url.searchParams.set(
      "dates",
      `${fmt(config.weddingDate)}/${fmt(config.weddingDateEnd || config.weddingDate)}`
    );
    const firstEvent = config.events?.[0];
    if (firstEvent) {
      url.searchParams.set("location", `${firstEvent.venue}, ${firstEvent.address}`);
      url.searchParams.set(
        "details",
        `${firstEvent.name} — ${firstEvent.date}, ${firstEvent.time}`
      );
    }
    btnCal.href = url.toString();
  }
}
