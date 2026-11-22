import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import ProductImage from '../components/ProductImage';
import { categories } from '../data/products';
import { useStore } from '../context/StoreContext';
import { colors, radius } from '../theme';

export default function ExploreScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useStore();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 12 }}>
      <Text style={styles.title}>{t('explore.title')}</Text>
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
            style={({ pressed }) => [styles.tile, { backgroundColor: item.bg, borderColor: item.border }, pressed && { opacity: 0.9 }]}
          >
            <ProductImage item={item} style={styles.img} rounded={radius.lg} emojiSize={54} />
            <Text style={styles.label}>{t('cat.' + item.id)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.dark, textAlign: 'center' },
  tile: { flex: 1, height: 184, borderRadius: radius.lg, borderWidth: 1, padding: 12, alignItems: 'center' },
  img: { width: '100%', height: 104, backgroundColor: 'rgba(255,255,255,0.6)' },
  label: { marginTop: 14, fontSize: 15, fontWeight: '800', color: colors.dark, textAlign: 'center' },
});
