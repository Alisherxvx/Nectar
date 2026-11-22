# Dastarkhan — азық-түлік жеткізу қосымшасы (Expo / React Native)

## Іске қосу
```bash
npm install
npx expo install expo-linear-gradient @react-native-async-storage/async-storage
npx expo start
```
(Android/iOS-та Expo Go қосымшасымен QR-кодты сканерлеңіз.)

## Нағыз тауар фотоларын қосу
**1-жол (ұсынылады): файл арқылы** — фотоны `assets/products/<id>.jpg` деп сақтаңыз
(мысалы `banana.jpg`, `kurt.jpg`). Содан кейін: `npm run images`
Команда қай тауарға фото жоқ екенін де көрсетеді. Фотосы жоқ тауарға әдемі эмодзи-плитка көрінеді.

**2-жол: интернет-сілтеме (URL)** — `src/data/imageUrls.js` ішіне жазыңыз:
`banana: 'https://sizdin-sayt.kz/banana.jpg'`. Сілтеме тікелей сурет файлына апаруы керек.

Тауар id-лері: `src/data/products.js`. Жаңа тауар қосу — бір жол `p(...)`.

## Өзгертуге болатын жерлер
- `src/config.js` — жеткізу бағасы, тегін жеткізу шегі, қолдау телефоны/WhatsApp/Telegram/email
- `src/i18n/index.js` — барлық мәтін (орысша `ru` және қазақша `kk`)
- `src/theme.js` — түстер

## Маңызды (өндіріске шығармас бұрын)
Қазір кіру (SMS-код, email), төлем және хабарламалар — **демо**: деректер құрылғыда сақталады.
Нақты сатылымға шығару үшін қосу керек: сервер (backend), SMS/Auth (Firebase, Twilio, Mobizon),
төлем шлюзі (Kaspi Pay, CloudPayments, Stripe), push-хабарлама (expo-notifications).
