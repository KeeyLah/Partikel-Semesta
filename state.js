function status_baru() {
  return {
    points: poin_mulai,
    rebirths: 0,
    bigBangs: 0,
    bought: daftar_generator.map(() => 0),
    count:  daftar_generator.map(() => 0)
  };
}

let status = status_baru();

const bigbangmulti = () => 1 + bing_bonus * status.bigBangs;
const multi = () => (1 + rebirth_bonus * status.rebirths) * bigbangmulti();
const bonusPercent = () => Math.round(rebirth_bonus * 100 * status.rebirths);
const bingpercent = () => Math.round(bing_bonus * 100 * status.bigBangs);
const bing_perlu = () => bing_awal + bing_naik * status.bigBangs;
const jika_bing = () => status.rebirths >= bing_perlu();
const harga_generator = i => Math.ceil(daftar_generator[i].baseCost * harga_naik ** status.bought[i]);
const harga_rebirth = () => Math.ceil(hargar * hargar_naik ** status.rebirths);
const kebuka = i => status.rebirths >= daftar_generator[i].unlock;

const poinpersecond = () =>
  income + status.count[0] * daftar_generator[0].rate * multi();
