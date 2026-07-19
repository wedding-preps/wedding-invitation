/**
 * butterflies.js — kupu-kupu realistis melayang rendah di area bawah layar
 * (di antara bunga/ornamen): terbang pendek, hinggap sambil mengepak pelan,
 * lalu pindah ke titik berikutnya. Rute diacak via CSS custom property;
 * setelah satu siklus selesai, rutenya diacak ulang.
 * Keyframes ada di css/animations.css, struktur/warna di css/components.css.
 */

// Varian warna: coklat tua + aksen oranye/kuning (tampak atas, gaya nymphalid)
const VARIANTS = [
  { wing: "#2b2015", accent: "#e2762a", accent2: "#8a6b1f" },
  { wing: "#1f1a12", accent: "#e8b62f", accent2: "#e8c02f" },
  { wing: "#33261a", accent: "#c96a2e", accent2: "#d9a637" },
];
const COUNT = 3;

// Wilayah jelajah: pita bawah viewport, di atas navigasi
const X_MIN = 6;
const X_MAX = 82;
const Y_MIN = 64;
const Y_MAX = 84;

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Acak ulang ukuran, warna, kecepatan, dan rute jelajah. */
function randomizeFlight(el, firstFlight) {
  const s = el.style;
  const variant = pick(VARIANTS);

  s.setProperty("--b-size", `${Math.round(rand(26, 40))}px`);
  s.setProperty("--b-wing", variant.wing);
  s.setProperty("--b-accent", variant.accent);
  s.setProperty("--b-accent2", variant.accent2);
  s.setProperty("--b-opacity", rand(0.85, 1).toFixed(2));
  s.setProperty("--b-duration", `${rand(12, 20).toFixed(1)}s`);
  s.setProperty("--b-delay", `${(firstFlight ? rand(0, 6) : rand(0.5, 3)).toFixed(1)}s`);
  s.setProperty("--b-flap", `${rand(0.55, 0.95).toFixed(2)}s`);
  s.setProperty("--b-bob", `${rand(2.4, 3.6).toFixed(2)}s`);
  s.setProperty("--b-tilt", `${rand(6, 16).toFixed(0)}deg`);

  // 4 waypoint dalam pita bawah; titik 1 & 2 adalah tempat hinggap
  [0, 1, 2, 3].forEach((i) => {
    s.setProperty(`--b-x${i}`, `${rand(X_MIN, X_MAX).toFixed(1)}vw`);
    s.setProperty(`--b-y${i}`, `${rand(Y_MIN, Y_MAX).toFixed(1)}vh`);
  });
}

function createButterfly(layer) {
  const el = document.createElement("div");
  el.className = "butterfly";
  el.innerHTML = `
    <div class="butterfly__inner">
      <div class="butterfly__wing butterfly__wing--left">
        <svg viewBox="0 0 60 90" aria-hidden="true"><use href="#orn-butterfly-wing" /></svg>
      </div>
      <div class="butterfly__wing butterfly__wing--right">
        <svg viewBox="0 0 60 90" aria-hidden="true"><use href="#orn-butterfly-wing" /></svg>
      </div>
      <div class="butterfly__body"></div>
    </div>`;

  randomizeFlight(el, true);

  // Setelah satu siklus selesai (forwards), reset animasi lalu jelajah lagi
  el.addEventListener("animationend", (e) => {
    if (e.target !== el) return;
    el.style.animation = "none";
    void el.offsetWidth; // paksa reflow agar animasi bisa dimulai ulang
    randomizeFlight(el, false);
    el.style.animation = "";
  });

  layer.appendChild(el);
}

export function init() {
  const layer = document.getElementById("butterflies");
  if (!layer) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < COUNT; i++) createButterfly(layer);
}
