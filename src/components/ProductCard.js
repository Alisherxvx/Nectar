import React from 'react';
import { formatPrice } from '../utils/format';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProductImage from './ProductImage';
import { useStore } from '../context/StoreContext';
import { colors, radius, shadow } from '../theme';

export default function ProductCard({ product, width, style }) {
  const navigation = useNavigation();
  const { addToCart } = useStore();

  return (
    <Pressable
      onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
      style={({ pressed }) => [styles.card, width ? { width } : null, pressed && { opacity: 0.92 }, style]}
    >
      <ProductImage uri={product.image} style={styles.image} rounded={radius.md} />
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.unit}>{product.unit}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Pressable onPress={() => addToCart(product.id)} style={styles.add} hitSlop={6}>
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#EDEDED',
    padding: 12,
    ...shadow,
  },
  image: { width: '100%', height: 110, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: '700', color: colors.dark, minHeight: 40 },
  unit: { fontSize: 13, color: colors.gray, marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  price: { fontSize: 18, fontWeight: '700', color: colors.dark },
  add: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
