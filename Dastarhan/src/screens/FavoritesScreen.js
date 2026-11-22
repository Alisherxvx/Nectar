import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductImage from '../components/ProductImage';
import { Button, EmptyState } from '../components/UI';
import { getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice, unitText } from '../utils/format';
import { colors } from '../theme';

export default function FavoritesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { favorites, addAllFavoritesToCart, toggleFavorite, t, lang } = useStore();
  const items = favorites.map(getProduct).filter(Boolean);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 12 }}>
      <Text style={styles.title}>{t('fav.title')}</Text>

      {items.length === 0 ? (
        <EmptyState icon="heart-outline" title={t('fav.empty')} text={t('fav.emptyText')} />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate('ProductDetail', { id: item.id })} style={styles.row}>
                <ProductImage item={item} style={styles.img} rounded={14} emojiSize={30} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.name}>{item.name[lang]}</Text>
                  <Text style={styles.unit}>{unitText(item, t)}</Text>
                </View>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={10} style={{ marginLeft: 12 }}>
                  <Ionicons name="heart" size={22} color={colors.red} />
                </Pressable>
              </Pressable>
            )}
          />
          <View style={[styles.footer, { paddingBottom: 14 }]}>
            <Button title={t('fav.addAll')} onPress={addAllFavoritesToCart} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.dark, textAlign: 'center', marginBottom: 6 },
  sep: { height: 1, backgroundColor: '#EEF1EE' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  img: { width: 64, height: 64 },
  name: { fontSize: 16, fontWeight: '700', color: colors.dark },
  unit: { fontSize: 13, color: colors.gray, marginTop: 4 },
  price: { fontSize: 16, fontWeight: '800', color: colors.dark },
  footer: { position: 'absolute', left: 20, right: 20, bottom: 0, backgroundColor: colors.white, paddingTop: 10 },
});
