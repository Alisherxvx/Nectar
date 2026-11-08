// Фото товаров подгружаются из интернета по ключевым словам (нужен доступ в сеть).
// Чтобы использовать свои фото, положите файлы в assets/ и замените image на require('../../assets/apple.jpg').
const img = (keyword, lock) => `https://loremflickr.com/400/400/${keyword}?lock=${lock}`;

export const categories = [
  { id: 'fruits', name: 'Свежие фрукты\nи овощи', short: 'Фрукты и овощи', bg: '#EEF7F1', border: '#BFE1CB', image: img('vegetables,fruit', 11) },
  { id: 'oil', name: 'Масло\nи жиры', short: 'Масло и жиры', bg: '#FFF6E9', border: '#F6DDB5', image: img('olive,oil', 12) },
  { id: 'meat', name: 'Мясо\nи рыба', short: 'Мясо и рыба', bg: '#FDE8E4', border: '#F5C2B8', image: img('steak,meat', 13) },
  { id: 'bakery', name: 'Выпечка\nи снеки', short: 'Выпечка и снеки', bg: '#F4EBF8', border: '#DCC7E8', image: img('bread,bakery', 14) },
  { id: 'dairy', name: 'Молочные\nпродукты и яйца', short: 'Молочное и яйца', bg: '#FFF8DC', border: '#F3E3A0', image: img('eggs,milk', 15) },
  { id: 'beverages', name: 'Напитки', short: 'Напитки', bg: '#EAF4FB', border: '#BCD9EE', image: img('drinks,bottles', 16) },
];

const lorem = (name) =>
  `${name} — свежий продукт высокого качества. Хранить в прохладном сухом месте. Подходит для ежедневного рациона и приготовления домашних блюд.`;

const OWN = 'Своя коллекция';

const p = (id, name, unit, price, category, tag, brand, keyword, lock, extra = {}) => ({
  id,
  name,
  unit,
  price,
  category,
  tag,
  brand,
  image: img(keyword, lock),
  description: extra.description || lorem(name),
  nutrition: extra.nutrition || '100 г',
  rating: extra.rating || 4,
});

export const products = [
  // Фрукты и овощи
  p('banana', 'Органические бананы', '7 шт.', 1190, 'fruits', 'Фрукты', OWN, 'banana', 21),
  p('apple', 'Красное яблоко', '1 кг', 990, 'fruits', 'Фрукты', OWN, 'red,apple', 22),
  p('naturel-apple', 'Натуральное красное яблоко', '1 кг', 1190, 'fruits', 'Фрукты', OWN, 'apple,fruit', 23, {
    description:
      'Яблоки полезны для здоровья: в них много клетчатки, витамина C и антиоксидантов. Они помогают контролировать вес и входят в здоровый рацион.',
    rating: 5,
  }),
  p('pepper', 'Красный болгарский перец', '1 кг', 1790, 'fruits', 'Овощи', OWN, 'red,pepper', 24),
  p('ginger', 'Имбирь', '250 г', 890, 'fruits', 'Овощи', OWN, 'ginger,root', 25),
  p('tomato', 'Свежие помидоры', '1 кг', 790, 'fruits', 'Овощи', OWN, 'tomato', 26),
  p('avocado', 'Спелое авокадо', '2 шт.', 1290, 'fruits', 'Фрукты', OWN, 'avocado', 27),
  p('broccoli', 'Брокколи', '500 г', 890, 'fruits', 'Овощи', OWN, 'broccoli', 28),

  // Мясо и рыба
  p('beef', 'Говяжья кость', '1 кг', 2490, 'meat', 'Мясо', OWN, 'beef,meat', 31),
  p('chicken', 'Курица-бройлер', '1 кг', 1890, 'meat', 'Мясо', OWN, 'raw,chicken', 32),
  p('salmon', 'Атлантический лосось', '500 г', 6490, 'meat', 'Рыба', OWN, 'salmon,fillet', 33),

  // Молочное и яйца
  p('egg-red', 'Яйца куриные красные', '4 шт.', 390, 'dairy', 'Яйца', 'Kazi Farmas', 'brown,eggs', 41),
  p('egg-white', 'Яйца куриные белые', '180 г', 590, 'dairy', 'Яйца', 'Kazi Farmas', 'white,eggs', 42),
  p('egg-pasta', 'Яичная паста', '500 г', 790, 'dairy', 'Лапша и паста', 'Ifad', 'pasta,dry', 43),
  p('egg-noodles', 'Яичная лапша', '400 г', 590, 'dairy', 'Лапша и паста', 'Ifad', 'noodles', 44),
  p('mayo', 'Майонез без яиц', '325 мл', 990, 'dairy', 'Фастфуд', 'Ifad', 'mayonnaise,jar', 45),
  p('milk', 'Свежее молоко', '1 л', 590, 'dairy', 'Молоко', 'Kazi Farmas', 'milk,bottle', 46),

  // Напитки
  p('diet-coke', 'Diet Coke', '355 мл', 450, 'beverages', 'Газировка', 'Cocola', 'cola,can', 51),
  p('sprite', 'Sprite', '325 мл', 390, 'beverages', 'Газировка', 'Cocola', 'lemon,soda', 52),
  p('apple-juice', 'Яблочно-виноградный сок', '2 л', 1190, 'beverages', 'Соки', OWN, 'apple,juice', 53),
  p('orange-juice', 'Апельсиновый сок', '2 л', 1290, 'beverages', 'Соки', OWN, 'orange,juice', 54),
  p('coca-cola', 'Coca Cola', '325 мл', 450, 'beverages', 'Газировка', 'Cocola', 'coke,can', 55),
  p('pepsi', 'Pepsi', '330 мл', 420, 'beverages', 'Газировка', 'Cocola', 'soda,can', 56),

  // Выпечка и снеки
  p('bread', 'Хлеб на закваске', '500 г', 1190, 'bakery', 'Выпечка', OWN, 'sourdough,bread', 61),
  p('croissant', 'Круассаны сливочные', '4 шт.', 1590, 'bakery', 'Выпечка', OWN, 'croissant', 62),
  p('chips', 'Картофельные чипсы', '150 г', 990, 'bakery', 'Чипсы и снеки', 'Ifad', 'potato,chips', 63),
  p('nachos', 'Кукурузные начос', '200 г', 1090, 'bakery', 'Чипсы и снеки', 'Ifad', 'nachos', 64),

  // Масло
  p('olive-oil', 'Оливковое масло Extra Virgin', '1 л', 4990, 'oil', 'Масло', OWN, 'olive,oil,bottle', 71),
  p('sunflower-oil', 'Подсолнечное масло', '1 л', 1290, 'oil', 'Масло', OWN, 'sunflower,oil', 72),
];

export const getProduct = (id) => products.find((x) => x.id === id);

export const exclusiveOffer = ['banana', 'apple', 'tomato', 'avocado'].map(getProduct);
export const bestSelling = ['pepper', 'ginger', 'broccoli', 'naturel-apple'].map(getProduct);
export const groceries = ['beef', 'chicken', 'salmon', 'milk'].map(getProduct);

export const groceryChips = [
  { id: 'oil', label: 'Масло', color: '#FFF1DC', image: img('olive,oil', 81) },
  { id: 'bakery', label: 'Выпечка', color: '#E7F4EA', image: img('bread', 82) },
  { id: 'dairy', label: 'Молочное', color: '#FFF8DC', image: img('milk', 83) },
];

export const filterCategories = Array.from(new Set(products.map((x) => x.tag))).sort((a, b) => a.localeCompare(b, 'ru'));
export const filterBrands = Array.from(new Set(products.map((x) => x.brand))).sort((a, b) => a.localeCompare(b, 'ru'));
