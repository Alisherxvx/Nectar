import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../api/productsApi';
import { CategoryId, Product, products as localProducts } from '../data/products';

interface ProductsValue {
  products: Product[];
  loading: boolean;
  /** Текст ошибки, если API не ответил (тогда показываем локальные товары). */
  error: string | null;
  reload: () => void;
  getProduct: (id: string) => Product | undefined;
  byCategory: (id: CategoryId) => Product[];
  byTag: (tag: NonNullable<Product['tags']>[number]) => Product[];
}

const ProductsContext = createContext<ProductsValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProducts(await fetchProducts());
    } catch (e) {
      // Нет интернета или API недоступен — работаем на локальных данных.
      setError(e instanceof Error ? e.message : 'Не удалось загрузить товары');
      setProducts(localProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo<ProductsValue>(
    () => ({
      products,
      loading,
      error,
      reload: load,
      getProduct: (id) => products.find((p) => p.id === id),
      byCategory: (id) => products.filter((p) => p.category === id),
      byTag: (tag) => products.filter((p) => p.tags?.includes(tag)),
    }),
    [products, loading, error, load],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used inside <ProductsProvider>');
  return ctx;
}
