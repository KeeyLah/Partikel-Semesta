function format_angka(n) {
  if (n >= 1e18) return n.toExponential(1).replace('+', '');
  const satuan = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
  let i = 0;
  while (n >= 1000 && i < satuan.length - 1) { n /= 1000; i++; }
  return (Math.floor(n * 10) / 10).toFixed(1) + satuan[i];
}

const toko = document.getElementById('shop');
const baris = [];

daftar_generator.forEach((gen, i) => {
  const tombol = document.createElement('button');
  tombol.className = 'item';
  const teks = document.createElement('span');
  const nama = document.createElement('strong');
  const keterangan = document.createElement('small');
  const harga = document.createElement('b');
  teks.append(nama, keterangan);
  tombol.append(teks, harga);
  tombol.addEventListener('click', () => beli_generator(i));
  toko.appendChild(tombol);
  baris.push({ tombol, nama, keterangan, harga });
});

function render() {
  document.getElementById('points').textContent = format_angka(status.points);
  document.getElementById('pps').textContent = format_angka(poinpersecond());
  document.getElementById('bonus').textContent = '+' + bonusPercent() + '%';
  document.getElementById('bigBangBonus').textContent = '+' + bingpercent() + '%';

  daftar_generator.forEach((gen, i) => {
    const br = baris[i];
    br.nama.textContent = gen.name;

    if (!kebuka(i)) {
      br.tombol.classList.add('locked');
      br.tombol.disabled = true;
      br.keterangan.textContent = `Terkunci. Terbuka di Rebirth ke-${gen.unlock}`;
      br.harga.textContent = 'Terkunci';
      return;
    }

    const hasil = i === 0 ? 'poin' : daftar_generator[i - 1].name;
    const harga = harga_generator(i);
    br.tombol.classList.remove('locked');
    br.keterangan.textContent =
      `Memproduksi ${gen.rate} ${hasil}/detik per unit. Dimiliki: ${format_angka(status.count[i])}`;
    br.harga.textContent = format_angka(harga);
    br.tombol.disabled = status.points < harga;
  });

  const bonus_berikut = bonusPercent() + rebirth_bonus * 100;
  const gen_berikut = daftar_generator.find(gen => gen.unlock === status.rebirths + 1);
  const teks_buka = gen_berikut ? `, membuka ${gen_berikut.name}` : '';
  document.getElementById('rebirthInfo').textContent =
    `Rebirth ke-${status.rebirths + 1}: bonus jadi +${bonus_berikut}% permanen${teks_buka}`;
  document.getElementById('rebirthCost').textContent = format_angka(harga_rebirth());
  document.getElementById('rebirth').disabled = status.points < harga_rebirth();

  const bing_berikut = bingpercent() + bing_bonus * 100;
  document.getElementById('bigBangInfo').textContent =
    `Big Bang ke-${status.bigBangs + 1}: butuh ${bing_perlu()} rebirth, reset poin & generator, bonus jadi +${bing_berikut}% permanen`;
  document.getElementById('bigBangStatus').textContent =
    jika_bing() ? 'Siap' : `${status.rebirths}/${bing_perlu()} rebirth`;
  document.getElementById('bigbang').disabled = !jika_bing();
}
