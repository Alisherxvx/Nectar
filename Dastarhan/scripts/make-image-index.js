// Іске қосу: npm run images
// assets/products/ ішіндегі барлық фотоларды (id.jpg, id.png, id.webp) тауарларға байлайды.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'products');
const out = path.join(__dirname, '..', 'src', 'data', 'productImages.js');
fs.mkdirSync(dir, { recursive: true });

const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
const lines = files.map((f) => `  '${path.parse(f).name}': require('../../assets/products/${f}'),`);
const body =
  '// АВТОМАТТЫ ТҮРДЕ ЖАСАЛҒАН — қолмен өзгертпеңіз. Жаңарту: npm run images\n' +
  `export default {\n${lines.join('\n')}\n};\n`;
fs.writeFileSync(out, body);

const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.js'), 'utf8');
const ids = [...src.matchAll(/^\s*p\('([^']+)'/gm)].map((m) => m[1]);
const have = new Set(files.map((f) => path.parse(f).name));
const missing = ids.filter((id) => !have.has(id));
console.log(`Фото табылды: ${files.length}. Файл жасалды: src/data/productImages.js`);
if (missing.length) console.log('Фотосы жоқ тауарлар (эмодзи көрсетіледі):\n  ' + missing.join(', '));
