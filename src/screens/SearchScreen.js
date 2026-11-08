import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const { applyFilters, activeFilterCount } = useStore();

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? products.filter((p) => p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q))
      : products;
    return applyFilters(base);
  }, [query, applyFilters]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 8 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={{ marginRight: 8 }}>
          <Ionicons name="chevron-back" size={26} color={colors.dark} />
        </Pressable>
        <SearchBar value={query} onChangeText={setQuery} autoFocus style={{ flex: 1 }} />
        <Pressable onPress={() => navigation.navigate('Filters')} hitSlop={10} style={{ marginLeft: 12 }}>
          <Ionicons name="options-outline" size={24} color={colors.dark} />
          {activeFilterCount > 0 && <View style={styles.dot} />}
        </Pressable>
      </View>

      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(i) => i.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
        columnWrapperStyle={{ gap: 14 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} style={{ flex: 1 }} />}
        ListEmptyComponent={<Text style={styles.empty}>По запросу «{query}» ничего не найдено.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  dot: { position: 'absolute', top: 0, right: -2, width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary },
  empty: { textAlign: 'center', marginTop: 60, color: colors.gray, fontSize: 15 },
});
