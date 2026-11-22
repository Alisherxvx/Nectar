import React, { useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { products, collectionProducts } from '../data/products';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

// route.params: { id } — санат, немесе { collection } — 'exclusive' | 'best'
export default function CategoryScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { applyFilters, activeFilterCount, t } = useStore();
  const { id, collection } = route.params;
  const title = collection ? t('collection.' + collection) : t('cat.' + id);

  const data = useMemo(
    () => applyFilters(collection ? collectionProducts(collection) : products.filter((p) => p.category === id)),
    [id, collection, applyFilters]
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 8 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.side}>
          <Ionicons name="chevron-back" size={26} color={colors.dark} />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Pressable onPress={() => navigation.navigate('Filters')} hitSlop={10} style={[styles.side, { alignItems: 'flex-end' }]}>
          <Ionicons name="options-outline" size={24} color={colors.dark} />
          {activeFilterCount > 0 && <View style={styles.dot} />}
        </Pressable>
      </View>

      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
        columnWrapperStyle={{ gap: 14 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} style={{ flex: 1 }} />}
        ListEmptyComponent={<Text style={styles.empty}>{t('category.empty')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 44 },
  side: { width: 40, justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center', fontSize: 19, fontWeight: '800', color: colors.dark },
  dot: { position: 'absolute', top: 2, right: -2, width: 9, height: 9, borderRadius: 5, backgroundColor: colors.accent },
  empty: { textAlign: 'center', marginTop: 60, color: colors.gray, fontSize: 15 },
});
