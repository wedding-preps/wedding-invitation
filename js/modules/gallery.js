/**
 * gallery.js — render grid galeri dari config + lightbox vanilla
 * (klik untuk perbesar, navigasi prev/next, tombol Esc/panah).
 */
export function init(config) {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const photos = config.gallery || [];
  if (!photos.length) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  let current = 0;

  photos.forEach(({ src, alt }, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery__item";
    btn.setAttribute("data-reveal", "scale");
    btn.setAttribute("aria-label", `Perbesar ${alt || `foto ${i + 1}`}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";

    btn.appendChild(img);
    btn.addEventListener("click", () => open(i));
    grid.appendChild(btn);
  });

  if (!lightbox || !lightboxImg) return;

  const show = (i) => {
    current = (i + photos.length) % photos.length;
    lightboxImg.src = photos[current].src;
    lightboxImg.alt = photos[current].alt || "";
  };

  const open = (i) => {
    show(i);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };

  document.getElementById("lightbox-close")?.addEventListener("click", close);
  document
    .getElementById("lightbox-prev")
    ?.addEventListener("click", () => show(current - 1));
  document
    .getElementById("lightbox-next")
    ?.addEventListener("click", () => show(current + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}
