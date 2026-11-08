# Nectar — онлайн-магазин продуктов (React Native + Expo)

Экраны авторизации по макету Nectar:

| Экран | Файл |
|---|---|
| Splash (через 2 с переходит дальше) | `src/screens/SplashScreen.js` |
| Welcome / Get Started | `src/screens/OnboardingScreen.js` |
| Вход по номеру + Google / Facebook | `src/screens/SignInScreen.js` |
| Ввод номера телефона | `src/screens/NumberScreen.js` |
| Ввод 4-значного кода | `src/screens/VerificationScreen.js` |
| Выбор зоны и района | `src/screens/SelectLocationScreen.js` |
| Login | `src/screens/LoginScreen.js` |
| Sign Up | `src/screens/SignUpScreen.js` |
| Временная главная | `src/screens/HomeScreen.js` |

Цепочка: Splash → Welcome → Sign In → Номер → Код → Локация → Login ⇄ Sign Up → Home.

## Запуск

```bash
npm install
npx expo install --fix   # подгоняет версии пакетов под ваш Expo SDK
npx expo start
```

Отсканируйте QR-код приложением **Expo Go** (Android / iOS) — приложение откроется на телефоне.

## Картинки

`assets/images/onboarding.png` (фото курьера) и `assets/images/groceries.png` (продукты) — временные заглушки.
Экспортируйте настоящие картинки из Figma и положите с теми же именами.

## Структура

```
App.js                  навигация (React Navigation, native stack)
src/theme.js            цвета
src/components/Icons.js морковка-логотип, флаг, иконки, иллюстрация карты (SVG)
src/components/UI.js    кнопки, поля ввода, пастельный фон
src/screens/            экраны
```
