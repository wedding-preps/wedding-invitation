/**
 * clipboard.js — render kartu amplop digital dari config
 * + tombol "Salin" nomor rekening ke clipboard.
 */
export function init(config) {
  const grid = document.getElementById("gift-grid");
  if (!grid) return;

  (config.gifts || []).forEach(({ bank, accountNumber, accountName }) => {
    const card = document.createElement("div");
    card.className = "gift-card card";
    card.setAttribute("data-reveal", "fade");

    const bankEl = document.createElement("p");
    bankEl.className = "gift-card__bank";
    bankEl.textContent = bank;

    const numberEl = document.createElement("p");
    numberEl.className = "gift-card__number";
    numberEl.textContent = accountNumber;

    const nameEl = document.createElement("p");
    nameEl.className = "gift-card__name";
    nameEl.textContent = `a.n. ${accountName}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn--gold";
    btn.textContent = "Salin";
    btn.addEventListener("click", () => copy(accountNumber, btn));

    card.append(bankEl, numberEl, nameEl, btn);
    grid.appendChild(card);
  });

  // Alamat kirim kado (opsional)
  const addressEl = document.getElementById("gift-address");
  const addr = config.giftAddress;
  if (addressEl && addr) {
    const title = document.createElement("strong");
    title.textContent = `${addr.label} — ${addr.recipient}`;
    const text = document.createElement("p");
    text.textContent = addr.address;
    addressEl.append(title, text);
  } else if (addressEl) {
    addressEl.remove();
  }
}

async function copy(text, btn) {
  let ok = false;
  try {
    await navigator.clipboard.writeText(text);
    ok = true;
  } catch {
    // Fallback untuk browser lama / konteks non-secure (file://)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
  }

  const original = btn.textContent;
  btn.textContent = ok ? "Tersalin ✓" : "Gagal menyalin";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 2000);
}
