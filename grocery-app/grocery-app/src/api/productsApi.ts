import type { CategoryId, Product } from '../data/products';

/**
 * Бесплатный учебный API: https://dummyjson.com
 * Ключ не нужен. Берём товары из категории "groceries".
 */
const BASE_URL = 'https://dummyjson.com';

/** Так выглядит один товар в ответе DummyJSON (только нужные нам поля). */
interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ApiResponse {
  products: ApiProduct[];
}

/** Определяем категорию приложения по названию товара. */
function guessCategory(title: string): CategoryId {
  const t = title.toLowerCase();
  if (/(juice|drink|water|coffee|soda|milk shake)/.test(t)) return 'beverages';
  if (/(beef|chicken|fish|meat|steak)/.test(t)) return 'meat';
  if (/(egg|milk|ice cream|cheese|yogurt)/.test(t)) return 'dairy';
  if (/(oil|honey|ghee)/.test(t)) return 'oil';
  if (/(bread|rice|cookie|snack|food|powder|paper)/.test(t)) return 'bakery';
  return 'fruits';
}

/** Превращаем товар из API в наш тип Product. */
function toProduct(item: ApiProduct, index: number): Product {
  const tags: Product['tags'] = [index % 3 === 0 ? 'exclusive' : index % 3 === 1 ? 'bestSelling' : 'grocery'];
  return {
    id: `api-${item.id}`,
    name: item.title,
    unit: '1pc, Price',
    price: item.price,
    emoji: '🛒',
    image: item.thumbnail,
    category: guessCategory(item.title),
    description: item.description,
    tags,
  };
}

/** Загружает все продукты из API. */
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products/category/groceries?limit=0`);
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }
  const data: ApiResponse = await response.json();
  return data.products.map(toProduct);
}
