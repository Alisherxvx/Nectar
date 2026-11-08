import React, { useState } from 'react';
import { formatPrice } from '../utils/format';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductImage from '../components/ProductImage';
import Stepper from '../components/Stepper';
import PrimaryButton from '../components/PrimaryButton';
import { getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { colors, radius } from '../theme';

function Row({ title, right, onPress, children, open }) {
  return (
    <View style={styles.accRow}>
      <Pressable onPress={onPress} style={styles.accHead}>
        <Text style={styles.accTitle}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {right}
          <Ionicons name={open ? 'chevron-down' : 'chevron-forward'} size={18} color={colors.dark} style={{ marginLeft: 10 }} />
        </View>
      </Pressable>
      {open && children}
    </View>
  );
}

export default function ProductDetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const product = getProduct(route.params.id);
  const { favorites, toggleFavorite, addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState('detail');
  const fav = favorites.includes(product.id);

  const toggle = (k) => setOpen((o) => (o === k ? null : k));

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ProductImage uri={product.image} style={StyleSheet.absoluteFill} tint="#EFEFEF" />
          <View style={styles.heroShade} />
          <View style={[styles.topBar, { top: insets.top + 8 }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.round} hitSlop={8}>
              <Ionicons name="chevron-back" size={22} color={colors.dark} />
            </Pressable>
            <Pressable style={styles.round} hitSlop={8}>
              <Ionicons name="share-outline" size={20} color={colors.dark} />
            </Pressable>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.unit}>{product.unit}</Text>
            </View>
            <Pressable onPress={() => toggleFavorite(product.id)} hitSlop={10}>
              <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} color={fav ? colors.red : colors.gray} />
            </Pressable>
          </View>

          <View style={styles.qtyRow}>
            <Stepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} size="lg" />
            <Text style={styles.price}>{formatPrice(product.price * qty)}</Text>
          </View>

          <View style={{ marginTop: 18 }}>
            <Row title="Описание" open={open === 'detail'} onPress={() => toggle('detail')}>
              <Text style={styles.desc}>{product.description}</Text>
            </Row>
            <Row
              title="Пищевая ценность"
              open={open === 'nutr'}
              onPress={() => toggle('nutr')}
              right={
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{product.nutrition}</Text>
                </View>
              }
            >
              <Text style={styles.desc}>Калории, белки, жиры и углеводы указаны на 100 г продукта.</Text>
            </Row>
            <Row
              title="Отзывы"
              open={open === 'review'}
              onPress={() => toggle('review')}
              right={
                <View style={{ flexDirection: 'row' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Ionicons key={i} name="star" size={16} color={i <= product.rating ? '#F3603F' : '#E0E0E0'} />
                  ))}
                </View>
              }
            >
              <Text style={styles.desc}>Покупатели хвалят свежесть и качество этого товара.</Text>
            </Row>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
        <PrimaryButton
          title="Добавить в корзину"
          onPress={() => {
            addToCart(product.id, qty);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 360,
    backgroundColor: '#EFEFEF',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.04)' },
  topBar: { position: 'absolute', left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  name: { fontSize: 24, fontWeight: '700', color: colors.dark },
  unit: { fontSize: 16, color: colors.gray, marginTop: 6 },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 },
  price: { fontSize: 26, fontWeight: '700', color: colors.dark },
  accRow: { borderTopWidth: 1, borderTopColor: '#EBEBEB', paddingVertical: 14 },
  accHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accTitle: { fontSize: 16, fontWeight: '700', color: colors.dark },
  desc: { marginTop: 10, fontSize: 13.5, lineHeight: 20, color: colors.gray, fontWeight: '500' },
  badge: { backgroundColor: '#EBEBEB', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { fontSize: 10, color: colors.gray, fontWeight: '600' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: colors.white,
  },
});
