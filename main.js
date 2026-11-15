document.getElementById('rebirth').addEventListener('click', jika_rebirth);
document.getElementById('bigbang').addEventListener('click', jika_bigbang);

const tombol_reset = document.getElementById('reset');
let resetArmed = false;

tombol_reset.addEventListener('click', () => {
  if (!resetArmed) {
    resetArmed = true;
    tombol_reset.textContent = 'Yakin? Klik lagi untuk hapus semua progres';
    setTimeout(() => { resetArmed = false; tombol_reset.textContent = 'Reset game'; }, 3000);
    return;
  }
  resetArmed = false;
  tombol_reset.textContent = 'Reset game';
  status = status_baru();
  save();
});

let last = performance.now();
function loop(now) {
  const dt = (now - last) / 1000;
  last = now;
  produce(dt);
  render();
  requestAnimationFrame(loop);
}

load();
setInterval(save, 5000);
requestAnimationFrame(loop);
