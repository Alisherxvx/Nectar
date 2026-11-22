import productImages from './productImages';
import imageUrls from './imageUrls';

// Санаттар. Атаулары i18n-де: cat.<id>
export const categories = [
  { id: 'fruits', emoji: '🥦', bg: '#EAF6EF', border: '#BFE1CB' },
  { id: 'oil', emoji: '🫒', bg: '#FFF6E9', border: '#F6DDB5' },
  { id: 'meat', emoji: '🥩', bg: '#FDE8E4', border: '#F5C2B8' },
  { id: 'bakery', emoji: '🥐', bg: '#F4EBF8', border: '#DCC7E8' },
  { id: 'dairy', emoji: '🥛', bg: '#FFF8DC', border: '#F3E3A0' },
  { id: 'beverages', emoji: '🧃', bg: '#EAF4FB', border: '#BCD9EE' },
];
const catBg = Object.fromEntries(categories.map((c) => [c.id, c.bg]));

const OWN = 'own';

// p(id, emoji, {ru, kk}, amount, unit, price, category, tag, brand, extra)
// Фото: assets/products/<id>.jpg (npm run images) НЕМЕСЕ src/data/imageUrls.js ішіндегі сілтеме.
const p = (id, emoji, name, amount, unit, price, category, tag, brand, extra = {}) => ({
  id, emoji, name, amount, unit, price, category, tag, brand,
  oldPrice: extra.oldPrice || null,
  rating: extra.rating || 4,
  bg: catBg[category],
  image: productImages[id] || imageUrls[id] || null,
});

export const products = [
  p('banana', '🍌', { ru: 'Органические бананы', kk: 'Органикалық банан' }, 7, 'pcs', 1190, 'fruits', 'fruit', OWN, { oldPrice: 1490 }),
  p('apple', '🍎', { ru: 'Красное яблоко', kk: 'Қызыл алма' }, 1, 'kg', 990, 'fruits', 'fruit', OWN, { oldPrice: 1290 }),
  p('naturel-apple', '🍏', { ru: 'Натуральное красное яблоко', kk: 'Табиғи қызыл алма' }, 1, 'kg', 1190, 'fruits', 'fruit', OWN, { rating: 5 }),
  p('pepper', '🫑', { ru: 'Красный болгарский перец', kk: 'Қызыл болгар бұрышы' }, 1, 'kg', 1790, 'fruits', 'veg', OWN, { rating: 5 }),
  p('ginger', '🫚', { ru: 'Имбирь', kk: 'Зімбір' }, 250, 'g', 890, 'fruits', 'veg', OWN),
  p('tomato', '🍅', { ru: 'Свежие помидоры', kk: 'Балғын қызанақ' }, 1, 'kg', 790, 'fruits', 'veg', OWN, { oldPrice: 990 }),
  p('avocado', '🥑', { ru: 'Спелое авокадо', kk: 'Піскен авокадо' }, 2, 'pcs', 1290, 'fruits', 'fruit', OWN, { oldPrice: 1590 }),
  p('broccoli', '🥦', { ru: 'Брокколи', kk: 'Брокколи' }, 500, 'g', 890, 'fruits', 'veg', OWN, { rating: 5 }),

  p('beef', '🥩', { ru: 'Говядина на кости', kk: 'Сүйекті сиыр еті' }, 1, 'kg', 2490, 'meat', 'meat', OWN),
  p('chicken', '🍗', { ru: 'Курица-бройлер', kk: 'Бройлер тауық' }, 1, 'kg', 1890, 'meat', 'meat', OWN),
  p('salmon', '🐟', { ru: 'Атлантический лосось', kk: 'Атлант лососі' }, 500, 'g', 6490, 'meat', 'fish', OWN, { rating: 5 }),
  p('kazy', '🍖', { ru: 'Казы', kk: 'Қазы' }, 1, 'kg', 9900, 'meat', 'meat', 'Kazi Farmas', { rating: 5 }),

  p('egg-brown', '🥚', { ru: 'Яйца куриные коричневые', kk: 'Қоңыр тауық жұмыртқасы' }, 10, 'pcs', 890, 'dairy', 'eggs', 'Kazi Farmas'),
  p('egg-white', '🥚', { ru: 'Яйца куриные белые', kk: 'Ақ тауық жұмыртқасы' }, 10, 'pcs', 790, 'dairy', 'eggs', 'Kazi Farmas'),
  p('egg-pasta', '🍝', { ru: 'Яичная паста', kk: 'Жұмыртқалы паста' }, 500, 'g', 790, 'dairy', 'pasta', 'Ifad'),
  p('egg-noodles', '🍜', { ru: 'Яичная лапша', kk: 'Жұмыртқалы кеспе' }, 400, 'g', 590, 'dairy', 'pasta', 'Ifad'),
  p('mayo', '🫙', { ru: 'Майонез классический', kk: 'Классикалық майонез' }, 325, 'ml', 990, 'dairy', 'sauce', 'Ifad'),
  p('milk', '🥛', { ru: 'Свежее молоко', kk: 'Жаңа сүт' }, 1, 'l', 590, 'dairy', 'milk', 'Kazi Farmas', { rating: 5 }),
  p('ayran', '🥛', { ru: 'Айран', kk: 'Айран' }, 500, 'ml', 450, 'dairy', 'milk', 'Kazi Farmas'),
  p('kurt', '🧀', { ru: 'Курт', kk: 'Құрт' }, 200, 'g', 1490, 'dairy', 'milk', 'Kazi Farmas', { rating: 5 }),

  p('diet-coke', '🥤', { ru: 'Diet Coke', kk: 'Diet Coke' }, 355, 'ml', 450, 'beverages', 'soda', 'Coca-Cola'),
  p('sprite', '🥤', { ru: 'Sprite', kk: 'Sprite' }, 325, 'ml', 390, 'beverages', 'soda', 'Coca-Cola'),
  p('coca-cola', '🥤', { ru: 'Coca-Cola', kk: 'Coca-Cola' }, 325, 'ml', 450, 'beverages', 'soda', 'Coca-Cola'),
  p('pepsi', '🥤', { ru: 'Pepsi', kk: 'Pepsi' }, 330, 'ml', 420, 'beverages', 'soda', 'PepsiCo'),
  p('apple-juice', '🧃', { ru: 'Яблочно-виноградный сок', kk: 'Алма-жүзім шырыны' }, 2, 'l', 1190, 'beverages', 'juice', OWN),
  p('orange-juice', '🍊', { ru: 'Апельсиновый сок', kk: 'Апельсин шырыны' }, 2, 'l', 1290, 'beverages', 'juice', OWN),

  p('bread', '🍞', { ru: 'Хлеб на закваске', kk: 'Ашытқылы нан' }, 500, 'g', 1190, 'bakery', 'bakery', OWN, { rating: 5 }),
  p('croissant', '🥐', { ru: 'Круассаны сливочные', kk: 'Кілегейлі круассан' }, 4, 'pcs', 1590, 'bakery', 'bakery', OWN),
  p('baursak', '🍩', { ru: 'Баурсаки', kk: 'Бауырсақ' }, 300, 'g', 990, 'bakery', 'bakery', OWN, { rating: 5 }),
  p('chips', '🥔', { ru: 'Картофельные чипсы', kk: 'Картоп чипсы' }, 150, 'g', 990, 'bakery', 'snacks', 'Ifad'),
  p('nachos', '🌽', { ru: 'Кукурузные начос', kk: 'Жүгері начосы' }, 200, 'g', 1090, 'bakery', 'snacks', 'Ifad'),

  p('olive-oil', '🫒', { ru: 'Оливковое масло Extra Virgin', kk: 'Зәйтүн майы Extra Virgin' }, 1, 'l', 4990, 'oil', 'oil', OWN, { rating: 5 }),
  p('sunflower-oil', '🌻', { ru: 'Подсолнечное масло', kk: 'Күнбағыс майы' }, 1, 'l', 1290, 'oil', 'oil', OWN),
];

export const getProduct = (id) => products.find((x) => x.id === id);

export const collections = {
  exclusive: ['banana', 'apple', 'tomato', 'avocado'],
  best: ['pepper', 'kurt', 'broccoli', 'baursak', 'salmon', 'milk'],
};
export const collectionProducts = (key) => collections[key].map(getProduct);

export const groceryPicks = ['kazy', 'chicken', 'salmon', 'milk'].map(getProduct);

export const filterTags = Array.from(new Set(products.map((x) => x.tag)));
export const filterBrands = Array.from(new Set(products.map((x) => x.brand)));
