/**
 * guest.js — membaca nama tamu dari URL (?to=Nama+Tamu)
 * dan menampilkannya di sampul. Default: config.text.defaultGuest.
 */
export function init(config) {
  const el = document.getElementById("guest-name");
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const raw = (params.get("to") || "").trim();
  el.textContent = raw || config.text.defaultGuest;
}
