/**
 * opening.js — reveal sampul (transisi tirai ke atas) + kontrol musik.
 * Memicu event "invitation:opened" pada document saat undangan dibuka.
 *
 * Musik mendukung dua sumber (diatur di config.music):
 *  - youtubeId : streaming lewat pemutar YouTube IFrame tersembunyi
 *                (tanpa file lokal). Bila gagal dimuat, otomatis jatuh
 *                ke file src.
 *  - src       : file audio lokal (assets/audio/...).
 */
export function init(config) {
  const cover = document.getElementById("cover");
  const btnOpen = document.getElementById("btn-open");
  const audio = document.getElementById("bg-music");
  const btnMusic = document.getElementById("btn-music");
  const nav = document.getElementById("bottom-nav");
  if (!cover || !btnOpen) return;

  const setMusicState = (playing) => {
    btnMusic?.classList.toggle("is-playing", playing);
  };

  const music = createMusic(config, audio, setMusicState);

  btnOpen.addEventListener("click", () => {
    cover.classList.add("is-open");
    document.body.classList.remove("is-locked");
    if (nav) nav.hidden = false;
    if (btnMusic && music.available) btnMusic.hidden = false;

    if (config.music?.autoplayAfterOpen) music.play();

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

  btnMusic?.addEventListener("click", () => music.toggle());
}

/* ---------- Pemilihan backend musik ---------- */
function createMusic(config, audio, setMusicState) {
  const youtubeId = (config.music?.youtubeId || "").trim();
  if (youtubeId) {
    return createYouTubeMusic(youtubeId, config, audio, setMusicState);
  }
  return createFileMusic(config, audio, setMusicState);
}

/* ---------- Backend 1: file audio lokal ---------- */
function createFileMusic(config, audio, setMusicState) {
  if (!audio || !config.music?.src) {
    return { available: false, play() {}, toggle() {} };
  }
  audio.src = config.music.src;

  const play = () => {
    audio
      .play()
      .then(() => setMusicState(true))
      .catch(() => setMusicState(false)); // autoplay bisa diblok; tombol tetap tersedia
  };

  return {
    available: true,
    play,
    toggle() {
      if (audio.paused) {
        play();
      } else {
        audio.pause();
        setMusicState(false);
      }
    },
  };
}

/* ---------- Backend 2: streaming YouTube ---------- */
function createYouTubeMusic(videoId, config, audio, setMusicState) {
  let player = null;
  let ready = false;
  let failed = false;
  let pendingPlay = false;
  // Cadangan file lokal bila YouTube tidak bisa dimuat
  const fallback = createFileMusic(config, audio, setMusicState);
  let usingFallback = false;

  // Wadah pemutar: di luar layar (bukan display:none agar tetap diputar)
  const holder = document.createElement("div");
  holder.setAttribute("aria-hidden", "true");
  holder.style.cssText =
    "position:fixed;left:-9999px;top:0;width:220px;height:124px;overflow:hidden;pointer-events:none;";
  const mount = document.createElement("div");
  holder.appendChild(mount);
  document.body.appendChild(holder);

  const useFallback = () => {
    if (usingFallback) return;
    usingFallback = true;
    failed = true;
    if (fallback.available && pendingPlay) fallback.play();
  };

  // Muat YouTube IFrame API (sekali)
  const prevReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    prevReady?.();
    try {
      player = new window.YT.Player(mount, {
        videoId,
        width: 220,
        height: 124,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: videoId, // wajib agar loop bekerja
        },
        events: {
          onReady: () => {
            ready = true;
            if (pendingPlay) {
              player.unMute();
              player.playVideo();
            }
          },
          onStateChange: (e) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            setMusicState(e.data === 1);
          },
          onError: useFallback, // video dihapus / embed dinonaktifkan
        },
      });
    } catch {
      useFallback();
    }
  };

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = true;
  tag.onerror = useFallback; // offline / diblokir
  document.head.appendChild(tag);

  return {
    available: true,
    play() {
      pendingPlay = true;
      if (usingFallback) {
        fallback.play();
        return;
      }
      if (ready) {
        player.unMute();
        player.playVideo();
        return;
      }
      // Beri waktu API dimuat; bila belum siap juga, pakai file lokal
      setTimeout(() => {
        if (!ready && !failed) useFallback();
      }, 5000);
    },
    toggle() {
      if (usingFallback) {
        fallback.toggle();
        return;
      }
      if (!ready) {
        this.play();
        return;
      }
      if (player.getPlayerState() === 1) {
        player.pauseVideo();
        setMusicState(false);
      } else {
        player.unMute();
        player.playVideo();
      }
    },
  };
}
