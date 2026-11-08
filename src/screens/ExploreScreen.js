import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import ProductImage from '../components/ProductImage';
import { categories } from '../data/products';
import { colors, radius } from '../theme';

export default function ExploreScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 12 }}>
      <Text style={styles.title}>Найти товары</Text>
      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <SearchBar onPress={() => navigation.navigate('Search')} />
      </View>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
        columnWrapperStyle={{ gap: 14 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Category', { id: item.id })}
            style={({ pressed }) => [
              styles.tile,
              { backgroundColor: item.bg, borderColor: item.border },
              pressed && { opacity: 0.9 },
            ]}
          >
            <ProductImage uri={item.image} style={styles.img} rounded={radius.lg} tint="#ffffff90" />
            <Text style={styles.label}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', color: colors.dark, textAlign: 'center' },
  tile: {
    flex: 1,
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  img: { width: '100%', height: 108 },
  label: { marginTop: 14, fontSize: 16, fontWeight: '700', color: colors.dark, textAlign: 'center' },
});
