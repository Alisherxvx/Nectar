// Форматирование цены в тенге: 12490 -> "12 490 ₸"
export function formatPrice(value) {
  const n = Math.round(value);
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
}
