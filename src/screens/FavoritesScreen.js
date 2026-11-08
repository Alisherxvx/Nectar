import React from 'react';
import { formatPrice } from '../utils/format';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductImage from '../components/ProductImage';
import PrimaryButton from '../components/PrimaryButton';
import { getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

export default function FavoritesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { favorites, addAllFavoritesToCart } = useStore();
  const items = favorites.map(getProduct).filter(Boolean);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 12 }}>
      <Text style={styles.title}>Избранное</Text>
      <View style={styles.line} />

      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIcon}>
            <Ionicons name="heart-outline" size={44} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Пока ничего нет</Text>
          <Text style={styles.emptyText}>Нажмите на сердечко у товара, чтобы сохранить его здесь.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
                style={styles.row}
              >
                <ProductImage uri={item.image} style={styles.img} rounded={14} />
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.unit}>{item.unit}</Text>
                </View>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.dark} style={{ marginLeft: 12 }} />
              </Pressable>
            )}
          />
          <View style={styles.footer}>
            <PrimaryButton title="Добавить всё в корзину" onPress={addAllFavoritesToCart} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', color: colors.dark, textAlign: 'center' },
  line: { height: 1, backgroundColor: '#E2E2E2', marginTop: 16 },
  sep: { height: 1, backgroundColor: '#EDEDED' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  img: { width: 64, height: 64 },
  name: { fontSize: 16, fontWeight: '700', color: colors.dark },
  unit: { fontSize: 14, color: colors.gray, marginTop: 4 },
  price: { fontSize: 16, fontWeight: '700', color: colors.dark },
  footer: { position: 'absolute', left: 20, right: 20, bottom: 16 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80, paddingHorizontal: 40 },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.dark, marginTop: 20 },
  emptyText: { fontSize: 14, color: colors.gray, marginTop: 8, textAlign: 'center' },
});
