/**
 * main.js — orkestrasi: mengisi konten dari config.js,
 * merender daftar dinamis, lalu menginisialisasi semua modul.
 * Setiap modul aman dipanggil meski seksinya dihapus dari HTML.
 */
import { CONFIG } from "../config.js";
import * as guest from "./modules/guest.js";
import * as opening from "./modules/opening.js";
import * as countdown from "./modules/countdown.js";
import * as reveal from "./modules/reveal.js";
import * as rsvp from "./modules/rsvp.js";
import * as gallery from "./modules/gallery.js";
import * as clipboard from "./modules/clipboard.js";
import * as butterflies from "./modules/butterflies.js";

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
};

/* ---------- Konten statis dari config ---------- */
function bindContent() {
  const { bride, groom, hashtag } = CONFIG.couple;
  const coupleNames = `${groom.nickName} & ${bride.nickName}`;

  document.title = `Undangan Pernikahan ${coupleNames}`;

  // Cover
  setText("cover-groom-initial", (groom.nickName || groom.fullName).trim().charAt(0).toUpperCase());
  setText("cover-bride-initial", (bride.nickName || bride.fullName).trim().charAt(0).toUpperCase());
  setText("cover-eyebrow", CONFIG.text.coverEyebrow);
  setText("cover-names", coupleNames);
  setText("cover-date", CONFIG.dateDisplay);
  setText("cover-guest-label", CONFIG.text.coverGuestLabel);
  setText("cover-button-text", CONFIG.text.coverButton);

  // Hero
  setText("hero-bismillah", CONFIG.text.bismillah);
  setText("hero-intro", CONFIG.text.heroIntro);
  setText("hero-names", coupleNames);
  setText("hero-date", CONFIG.dateDisplay);
  setText("hero-hashtag", hashtag);

  // Ayat
  setText("verse-arabic", CONFIG.verse.arabic);
  setText("verse-translation", CONFIG.verse.translation);
  setText("verse-source", CONFIG.verse.source);

  // Mempelai
  setText("bride-name", bride.fullName);
  setText("bride-parents", bride.parents);
  setText("groom-name", groom.fullName);
  setText("groom-parents", groom.parents);

  // Footer
  setText("footer-note", CONFIG.text.closingNote);
  setText("footer-thanks", CONFIG.text.footerThanks);
  setText("footer-names", coupleNames);
  setText("footer-closing", CONFIG.text.closingTitle);
}

/* ---------- Gambar mempelai (PNG dari config) ---------- */
function bindCoupleImages() {
  [
    ["bride", CONFIG.couple.bride],
    ["groom", CONFIG.couple.groom],
  ].forEach(([key, person]) => {
    const img = document.getElementById(`${key}-img`);
    const fallback = document.getElementById(`${key}-fallback`);
    if (!img) return;

    // Tampilkan inisial dulu; gambar baru ditampilkan setelah berhasil dimuat,
    // sehingga tidak ada ikon gambar rusak / teks alt yang sempat terlihat.
    img.hidden = true;
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = (person.nickName || person.fullName || "?")
        .charAt(0)
        .toUpperCase();
    }
    if (!person.image) return;

    img.addEventListener(
      "load",
      () => {
        if (fallback) fallback.hidden = true;
        img.hidden = false;
      },
      { once: true }
    );
    img.src = person.image;
    img.alt = `Ilustrasi ${person.fullName}`;
  });
}

/* ---------- Kartu acara ---------- */
function renderEvents() {
  const grid = document.getElementById("events-grid");
  if (!grid) return;

  (CONFIG.events || []).forEach((ev) => {
    const card = document.createElement("article");
    card.className = "event-card card card--ornate";
    card.setAttribute("data-reveal", "fade");

    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("class", "event-card__star");
    star.setAttribute("aria-hidden", "true");
    star.innerHTML = '<use href="#orn-star8" />';

    const name = document.createElement("h3");
    name.className = "event-card__name";
    name.textContent = ev.name;

    const date = document.createElement("p");
    date.className = "event-card__date";
    date.textContent = ev.date;

    const time = document.createElement("p");
    time.className = "event-card__time";
    time.textContent = ev.time;

    const venue = document.createElement("p");
    venue.className = "event-card__venue";
    venue.textContent = ev.venue;

    const address = document.createElement("p");
    address.className = "event-card__address";
    address.textContent = ev.address;

    card.append(star, name, date, time, venue, address);

    if (ev.mapsLink) {
      const link = document.createElement("a");
      link.className = "btn btn--outline";
      link.href = ev.mapsLink;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Lihat Lokasi";
      card.appendChild(link);
    }

    grid.appendChild(card);
  });

  const map = document.getElementById("events-map");
  if (map && CONFIG.mapEmbedUrl) {
    map.src = CONFIG.mapEmbedUrl;
  } else {
    map?.closest(".events__map")?.remove();
  }
}

/* ---------- Kata pengantar (story) ---------- */
function renderStory() {
  const story = CONFIG.story;
  if (!story?.title || !story?.text) {
    // Tanpa konten: sembunyikan seksinya sekalian
    document.getElementById("story")?.remove();
    return;
  }
  setText("story-title", story.title);
  setText("story-text", story.text);
}

/* ---------- Partikel emas melayang ---------- */
function initParticles() {
  const layer = document.getElementById("particles");
  if (!layer) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const COUNT = 14;
  for (let i = 0; i < COUNT; i++) {
    const isLeaf = i % 3 === 0;
    const p = document.createElement(isLeaf ? "div" : "span");
    p.className = "particle";

    const size = isLeaf ? 10 + Math.random() * 8 : 3 + Math.random() * 4;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${60 + Math.random() * 50}%`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.setProperty("--p-duration", `${12 + Math.random() * 14}s`);
    p.style.setProperty("--p-delay", `${Math.random() * 14}s`);
    p.style.setProperty("--p-sway", `${-40 + Math.random() * 80}px`);
    p.style.setProperty("--p-opacity", `${0.25 + Math.random() * 0.35}`);

    if (isLeaf) {
      p.innerHTML =
        '<svg width="100%" height="100%" style="stroke:var(--sage);fill:none"><use href="#orn-leaf" /></svg>';
    } else {
      p.style.background = "var(--gold)";
      p.style.borderRadius = "50%";
      p.style.boxShadow = "0 0 6px var(--gold)";
    }

    layer.appendChild(p);
  }
}

/* ---------- Navigasi bawah: state aktif ---------- */
function initNav() {
  const nav = document.getElementById("bottom-nav");
  if (!nav) return;

  const items = [...nav.querySelectorAll(".bottom-nav__item")];
  const sections = items
    .map((item) => document.querySelector(item.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        items.forEach((item) =>
          item.classList.toggle(
            "is-active",
            item.getAttribute("href") === `#${entry.target.id}`
          )
        );
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((s) => io.observe(s));
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Skrip berhasil jalan — singkirkan peringatan file:// bila ada
  document.documentElement.classList.remove("is-file-protocol");

  bindContent();
  bindCoupleImages();
  renderEvents();
  renderStory();

  // Reveal, partikel & kupu-kupu baru berjalan setelah undangan dibuka,
  // agar animasi hero terlihat oleh tamu (bukan di balik cover).
  // Listener HARUS terpasang sebelum opening.init() — hook ?open memicu
  // event "invitation:opened" langsung saat init.
  const startVisuals = () => {
    reveal.init();
    initParticles();
    butterflies.init();
  };

  if (document.getElementById("cover")) {
    document.addEventListener("invitation:opened", startVisuals, { once: true });
  } else {
    startVisuals();
  }

  guest.init(CONFIG);
  opening.init(CONFIG);
  countdown.init(CONFIG);
  rsvp.init(CONFIG);
  gallery.init(CONFIG);
  clipboard.init(CONFIG);
  initNav();
});
