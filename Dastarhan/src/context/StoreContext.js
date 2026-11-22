import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProduct } from '../data/products';
import { dict } from '../i18n';
import { FREE_DELIVERY_FROM, DELIVERY_FEE } from '../config';

const STORAGE_KEY = 'dastarkhan:v1';
const emptyFilters = { categories: [], brands: [] };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const initial = {
  lang: 'ru',
  onboarded: false,
  user: null, // { name, phone, email }
  guest: false,
  addresses: [], // { id, label, city, street, details, comment }
  addressId: null,
  cards: [], // { id, brand, last4, exp, holder }  (толық нөмір мен CVV сақталмайды)
  paymentId: 'cash',
  orders: [],
  notif: { orders: true, promo: true, news: false },
  cart: {},
  favorites: ['kurt', 'milk', 'apple-juice'],
};

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [s, setS] = useState(initial);
  const [ready, setReady] = useState(false);
  const [filters, setFilters] = useState(emptyFilters);

  // Құрылғыдан деректерді жүктеу
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw);
        setS((p) => ({ ...p, ...saved, notif: { ...p.notif, ...(saved.notif || {}) } }));
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  // Әр өзгерісте сақтау
  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(s)).catch(() => {});
  }, [s, ready]);

  const t = useCallback(
    (key, params) => {
      let str = dict[s.lang]?.[key] ?? dict.ru[key] ?? key;
      if (params) Object.keys(params).forEach((k) => (str = str.split(`{${k}}`).join(String(params[k]))));
      return str;
    },
    [s.lang]
  );

  const patch = useCallback((p) => setS((prev) => ({ ...prev, ...(typeof p === 'function' ? p(prev) : p) })), []);

  // ---------- аккаунт ----------
  const setLang = useCallback((lang) => patch({ lang }), [patch]);
  const finishOnboarding = useCallback(() => patch({ onboarded: true }), [patch]);
  const signIn = useCallback((user) => patch((p) => ({ user: { ...(p.user || {}), ...user }, guest: false })), [patch]);
  const continueGuest = useCallback(() => patch({ guest: true }), [patch]);
  const updateUser = useCallback((u) => patch((p) => ({ user: { ...(p.user || {}), ...u } })), [patch]);
  const signOut = useCallback(
    () =>
      setS((p) => ({
        ...initial,
        lang: p.lang,
        onboarded: true,
        notif: p.notif,
      })),
    []
  );

  // ---------- себет ----------
  const addToCart = useCallback((id, qty = 1) => patch((p) => ({ cart: { ...p.cart, [id]: (p.cart[id] || 0) + qty } })), [patch]);
  const setQty = useCallback(
    (id, qty) =>
      patch((p) => {
        const cart = { ...p.cart };
        if (qty <= 0) delete cart[id];
        else cart[id] = qty;
        return { cart };
      }),
    [patch]
  );
  const removeFromCart = useCallback(
    (id) =>
      patch((p) => {
        const cart = { ...p.cart };
        delete cart[id];
        return { cart };
      }),
    [patch]
  );
  const clearCart = useCallback(() => patch({ cart: {} }), [patch]);

  // ---------- таңдаулылар ----------
  const toggleFavorite = useCallback(
    (id) => patch((p) => ({ favorites: p.favorites.includes(id) ? p.favorites.filter((x) => x !== id) : [...p.favorites, id] })),
    [patch]
  );
  const addAllFavoritesToCart = useCallback(
    () =>
      patch((p) => {
        const cart = { ...p.cart };
        p.favorites.forEach((id) => (cart[id] = (cart[id] || 0) + 1));
        return { cart };
      }),
    [patch]
  );

  // ---------- мекенжайлар ----------
  const saveAddress = useCallback(
    (addr) => {
      const id = addr.id || uid();
      patch((p) => {
        const exists = p.addresses.some((a) => a.id === id);
        const addresses = exists ? p.addresses.map((a) => (a.id === id ? { ...a, ...addr, id } : a)) : [...p.addresses, { ...addr, id }];
        return { addresses, addressId: p.addressId && exists ? p.addressId : id };
      });
      return id;
    },
    [patch]
  );
  const deleteAddress = useCallback(
    (id) =>
      patch((p) => {
        const addresses = p.addresses.filter((a) => a.id !== id);
        return { addresses, addressId: p.addressId === id ? addresses[0]?.id || null : p.addressId };
      }),
    [patch]
  );
  const selectAddress = useCallback((id) => patch({ addressId: id }), [patch]);

  // ---------- төлем ----------
  const addCard = useCallback(
    (card) => {
      const id = uid();
      patch((p) => ({ cards: [...p.cards, { ...card, id }], paymentId: id }));
      return id;
    },
    [patch]
  );
  const deleteCard = useCallback(
    (id) => patch((p) => ({ cards: p.cards.filter((c) => c.id !== id), paymentId: p.paymentId === id ? 'cash' : p.paymentId })),
    [patch]
  );
  const selectPayment = useCallback((id) => patch({ paymentId: id }), [patch]);
  const setNotif = useCallback((key, val) => patch((p) => ({ notif: { ...p.notif, [key]: val } })), [patch]);

  // ---------- сүзгілер ----------
  const applyFilters = useCallback(
    (list) =>
      list.filter(
        (item) =>
          (filters.categories.length === 0 || filters.categories.includes(item.tag)) &&
          (filters.brands.length === 0 || filters.brands.includes(item.brand))
      ),
    [filters]
  );

  // ---------- туынды мәндер ----------
  const derived = useMemo(() => {
    const cartItems = Object.entries(s.cart)
      .map(([id, qty]) => ({ product: getProduct(id), qty }))
      .filter((x) => x.product);
    const cartCount = cartItems.reduce((n, x) => n + x.qty, 0);
    const subtotal = cartItems.reduce((n, x) => n + x.qty * x.product.price, 0);
    const deliveryFee = cartCount === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    return { cartItems, cartCount, subtotal, deliveryFee, total: subtotal + deliveryFee };
  }, [s.cart]);

  const addressText = useCallback(
    (a) => (a ? `${t('city.' + a.city)}, ${a.street}${a.details ? ', ' + a.details : ''}` : ''),
    [t]
  );
  const paymentOptions = useMemo(
    () => [
      { id: 'cash', icon: 'cash-outline', title: t('pay.cash'), sub: t('pay.cashSub') },
      { id: 'courierCard', icon: 'card-outline', title: t('pay.courierCard'), sub: t('pay.courierCardSub') },
      ...s.cards.map((c) => ({ id: c.id, icon: 'card', title: `${c.brand} •• ${c.last4}`, sub: c.exp, isCard: true })),
    ],
    [s.cards, t]
  );
  const currentAddress = s.addresses.find((a) => a.id === s.addressId) || null;
  const currentPayment = paymentOptions.find((x) => x.id === s.paymentId) || paymentOptions[0];

  const placeOrder = useCallback(() => {
    const items = derived.cartItems.map(({ product, qty }) => ({ id: product.id, qty, price: product.price }));
    if (!items.length || !currentAddress) return null;
    const order = {
      id: uid(),
      no: String(Math.floor(100000 + Math.random() * 900000)),
      createdAt: Date.now(),
      items,
      subtotal: derived.subtotal,
      deliveryFee: derived.deliveryFee,
      total: derived.total,
      addressText: addressText(currentAddress),
      paymentTitle: currentPayment.title,
    };
    patch((p) => ({ orders: [order, ...p.orders], cart: {} }));
    return order;
  }, [derived, currentAddress, currentPayment, addressText, patch]);

  const repeatOrder = useCallback(
    (order) =>
      patch((p) => {
        const cart = { ...p.cart };
        order.items.forEach((i) => (cart[i.id] = (cart[i.id] || 0) + i.qty));
        return { cart };
      }),
    [patch]
  );

  const value = {
    ...s, ...derived, ready, t, filters, setFilters,
    resetFilters: () => setFilters(emptyFilters),
    activeFilterCount: filters.categories.length + filters.brands.length,
    applyFilters, currentAddress, currentPayment, paymentOptions, addressText,
    setLang, finishOnboarding, signIn, continueGuest, updateUser, signOut,
    addToCart, setQty, removeFromCart, clearCart, toggleFavorite, addAllFavoritesToCart,
    saveAddress, deleteAddress, selectAddress, addCard, deleteCard, selectPayment, setNotif,
    placeOrder, repeatOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
