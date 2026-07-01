/**
 * reveal.js — animasi masuk berbasis IntersectionObserver.
 *
 * - [data-reveal="fade|blur|scale"]  → kelas .is-visible saat terlihat
 * - [data-reveal-group]              → anak-anaknya di-stagger via --reveal-delay
 * - .ornament-draw-path              → efek "menggambar" garis SVG
 *   (stroke-dasharray/-offset diukur dari panjang path)
 */
export function init() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ---- Stagger anak-anak grup ----
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    group
      .querySelectorAll(":scope > [data-reveal], :scope > * > [data-reveal]")
      .forEach((child, i) => {
        child.style.setProperty("--reveal-delay", `${Math.min(i * 0.15, 0.9)}s`);
      });
  });

  // ---- Siapkan path SVG untuk efek draw-in ----
  const drawPaths = [];
  document.querySelectorAll(".ornament-draw-path").forEach((path) => {
    if (typeof path.getTotalLength !== "function") return;
    try {
      const len = Math.ceil(path.getTotalLength());
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      drawPaths.push(path);
    } catch {
      /* path tidak terukur (mis. display:none) — biarkan tampil normal */
    }
  });

  const showElement = (el) => {
    el.classList.add("is-visible");
    if (el.matches?.(".ornament-draw-path")) el.style.strokeDashoffset = "0";
    el.querySelectorAll?.(".ornament-draw-path").forEach((p) => {
      p.style.strokeDashoffset = "0";
    });
  };

  const targets = [
    ...document.querySelectorAll("[data-reveal]"),
    ...document.querySelectorAll(".ornament-draw"),
    ...drawPaths.map((p) => p.closest("svg") || p),
  ];
  const unique = [...new Set(targets)];

  if (reduceMotion || !("IntersectionObserver" in window)) {
    unique.forEach(showElement);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        showElement(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  unique.forEach((el) => io.observe(el));
}
