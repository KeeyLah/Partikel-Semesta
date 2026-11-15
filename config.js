const poin_mulai = 10;
const income = 0;
const harga_naik = 1.15;
const save_key = 'PartikelSemestaSave';

const daftar_generator = [
  { name: 'Partikel', baseCost: 10,   rate: 1, unlock: 0 },
  { name: 'Atom',     baseCost: 100,  rate: 6, unlock: 0 },
  { name: 'Molekul',  baseCost: 1e3,  rate: 6, unlock: 0 },
  { name: 'Planet',   baseCost: 1e4,  rate: 6, unlock: 1 },
  { name: 'Bintang',  baseCost: 1e5,  rate: 6, unlock: 2 },
  { name: 'Galaksi',  baseCost: 1e6,  rate: 6, unlock: 3 },
  { name: 'Gugus',    baseCost: 1e7,  rate: 6, unlock: 4 }
];

const hargar = 5000;
const hargar_naik = 3;
const rebirth_bonus = 0.5;

const bing_awal = 5;
const bing_naik = 1;
const bing_bonus = 1;
