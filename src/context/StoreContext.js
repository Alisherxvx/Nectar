import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { getProduct } from '../data/products';

const StoreContext = createContext(null);

const emptyFilters = { categories: [], brands: [] };

export function StoreProvider({ children }) {
  const [cart, setCart] = useState({}); // { productId: qty }
  const [favorites, setFavorites] = useState(['diet-coke', 'sprite', 'apple-juice', 'coca-cola', 'pepsi']);
  const [filters, setFilters] = useState(emptyFilters);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
  }, []);

  const setQty = useCallback((id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, []);

  const addAllFavoritesToCart = useCallback(() => {
    setCart((c) => {
      const next = { ...c };
      favorites.forEach((id) => {
        next[id] = (next[id] || 0) + 1;
      });
      return next;
    });
  }, [favorites]);

  const applyFilters = useCallback(
    (list) =>
      list.filter(
        (item) =>
          (filters.categories.length === 0 || filters.categories.includes(item.tag)) &&
          (filters.brands.length === 0 || filters.brands.includes(item.brand))
      ),
    [filters]
  );

  const value = useMemo(() => {
    const cartItems = Object.entries(cart)
      .map(([id, qty]) => ({ product: getProduct(id), qty }))
      .filter((x) => x.product);
    const cartCount = cartItems.reduce((s, x) => s + x.qty, 0);
    const cartTotal = cartItems.reduce((s, x) => s + x.qty * x.product.price, 0);
    const activeFilterCount = filters.categories.length + filters.brands.length;
    return {
      cart,
      cartItems,
      cartCount,
      cartTotal,
      favorites,
      filters,
      activeFilterCount,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleFavorite,
      addAllFavoritesToCart,
      setFilters,
      resetFilters: () => setFilters(emptyFilters),
      applyFilters,
    };
  }, [cart, favorites, filters, addToCart, setQty, removeFromCart, clearCart, toggleFavorite, addAllFavoritesToCart, applyFilters]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
