/**
 * opening.js — reveal sampul (transisi tirai ke atas) + kontrol musik.
 * Memicu event "invitation:opened" pada document saat undangan dibuka.
 */
export function init(config) {
  const cover = document.getElementById("cover");
  const btnOpen = document.getElementById("btn-open");
  const audio = document.getElementById("bg-music");
  const btnMusic = document.getElementById("btn-music");
  const nav = document.getElementById("bottom-nav");
  if (!cover || !btnOpen) return;

  if (audio && config.music?.src) {
    audio.src = config.music.src;
  }

  const setMusicState = (playing) => {
    btnMusic?.classList.toggle("is-playing", playing);
  };

  const playMusic = () => {
    if (!audio || !audio.src) return;
    audio
      .play()
      .then(() => setMusicState(true))
      .catch(() => setMusicState(false)); // autoplay bisa diblok; tombol tetap tersedia
  };

  btnOpen.addEventListener("click", () => {
    cover.classList.add("is-open");
    document.body.classList.remove("is-locked");
    if (nav) nav.hidden = false;
    if (btnMusic && audio?.src) btnMusic.hidden = false;

    if (config.music?.autoplayAfterOpen) playMusic();

    document.dispatchEvent(new CustomEvent("invitation:opened"));

    // Setelah transisi selesai, singkirkan cover dari accessibility tree
    cover.addEventListener(
      "transitionend",
      () => cover.setAttribute("aria-hidden", "true"),
      { once: true }
    );
  });

  // Hook uji: ?open langsung membuka undangan (untuk pratinjau/screenshot)
  if (new URLSearchParams(window.location.search).has("open")) {
    btnOpen.click();
  }

  btnMusic?.addEventListener("click", () => {
    if (!audio) return;
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      setMusicState(false);
    }
  });
}
