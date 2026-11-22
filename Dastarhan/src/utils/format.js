// 12490 -> "12 490 ₸"
export function formatPrice(value) {
  const n = Math.round(value);
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
}

// {amount:7, unit:'pcs'} -> "7 шт." / "7 дана"
export const unitText = (p, t) => `${p.amount} ${t('unit.' + p.unit)}`;

// Демо-статус: тапсырыс уақытына қарай автоматты өзгереді (нақты жүйеде сервер береді)
export function orderStatus(order, now = Date.now()) {
  const min = (now - order.createdAt) / 60000;
  if (min < 2) return 'processing';
  if (min < 45) return 'delivering';
  return 'delivered';
}

export function formatDate(ts, lang) {
  const d = new Date(ts);
  const months = {
    ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    kk: ['қаң', 'ақп', 'нау', 'сәу', 'мам', 'мау', 'шіл', 'там', 'қыр', 'қаз', 'қар', 'жел'],
  }[lang] || [];
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${d.getDate()} ${months[d.getMonth()]}, ${hh}:${mm}`;
}

// Luhn алгоритмі: карта нөмірін тексеру
export function luhnValid(num) {
  const s = num.replace(/\D/g, '');
  if (s.length < 13) return false;
  let sum = 0;
  let alt = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let n = parseInt(s[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function cardBrand(num) {
  const s = num.replace(/\D/g, '');
  if (/^4/.test(s)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(s)) return 'Mastercard';
  if (/^220[0-4]/.test(s)) return 'Mir';
  return 'Card';
}
