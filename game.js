function beli_generator(i) {
  if (!kebuka(i)) return;
  const  harga = harga_generator(i);
  if (status.points <  harga) return;
  status.points -=  harga;
  status.bought[i]++;
  status.count[i]++;
}

function jika_rebirth() {
  if (status.points < harga_rebirth()) return;
  const rebirths = status.rebirths + 1;
  status = { ...status_baru(), rebirths, bigBangs: status.bigBangs };
  save();
}

function jika_bigbang() {
  if (!jika_bing()) return;
  status = { ...status_baru(), bigBangs: status.bigBangs + 1 };
  save();
}

function produce(dt) {
  for (let i = daftar_generator.length - 1; i >= 1; i--) {
    status.count[i - 1] += status.count[i] * daftar_generator[i].rate * dt;
  }
  status.points += poinpersecond() * dt;
}

function save() {
  try {
    localStorage.setItem(save_key, JSON.stringify(status));
  } catch (e) {}
}

function pad(arr, n) {
  if (!Array.isArray(arr)) return Array(n).fill(0);
  return [...arr, ...Array(Math.max(0, n - arr.length)).fill(0)].slice(0, n);
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(save_key));
    if (!saved) return;
    status = { ...status_baru(), ...saved };
    const n = daftar_generator.length;
    status.bought = pad(saved.bought, n);
    status.count = pad(saved.count, n);
  } catch (e) {}
}
