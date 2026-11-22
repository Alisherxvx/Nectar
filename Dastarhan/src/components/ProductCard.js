import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProductImage from './ProductImage';
import { useStore } from '../context/StoreContext';
import { formatPrice, unitText } from '../utils/format';
import { colors, radius, shadow } from '../theme';

export default function ProductCard({ product, width, style }) {
  const navigation = useNavigation();
  const { addToCart, toggleFavorite, favorites, cart, t, lang } = useStore();
  const fav = favorites.includes(product.id);
  const inCart = cart[product.id] || 0;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <Pressable
      onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
      style={({ pressed }) => [styles.card, width ? { width } : null, pressed && { opacity: 0.93 }, style]}
    >
      <View>
        <ProductImage item={product} style={styles.image} rounded={radius.md} emojiSize={58} />
        {discount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{discount}%</Text>
          </View>
        )}
        <Pressable onPress={() => toggleFavorite(product.id)} hitSlop={8} style={styles.heart}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={18} color={fav ? colors.red : colors.gray} />
        </Pressable>
      </View>
      <Text style={styles.name} numberOfLines={2}>{product.name[lang]}</Text>
      <Text style={styles.unit}>{unitText(product, t)}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.oldPrice ? <Text style={styles.old}>{formatPrice(product.oldPrice)}</Text> : null}
        </View>
        <Pressable onPress={() => addToCart(product.id)} style={styles.add} hitSlop={6}>
          {inCart > 0 ? <Text style={styles.addCount}>{inCart}</Text> : <Ionicons name="add" size={24} color="#fff" />}
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: '#EEF1EE', padding: 10, ...shadow },
  image: { width: '100%', height: 112, marginBottom: 10 },
  badge: { position: 'absolute', top: 8, left: 8, backgroundColor: colors.accent, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  heart: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '700', color: colors.dark, minHeight: 38 },
  unit: { fontSize: 13, color: colors.gray, marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 },
  price: { fontSize: 17, fontWeight: '800', color: colors.dark },
  old: { fontSize: 12, color: colors.gray, textDecorationLine: 'line-through', marginTop: 1 },
  add: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  addCount: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
