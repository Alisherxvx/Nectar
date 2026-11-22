import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductImage from '../components/ProductImage';
import Stepper from '../components/Stepper';
import { Button } from '../components/UI';
import { getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice, unitText } from '../utils/format';
import { colors } from '../theme';

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
  const { favorites, toggleFavorite, addToCart, t, lang } = useStore();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState('detail');
  const [added, setAdded] = useState(false);
  const fav = favorites.includes(product.id);
  const toggle = (k) => setOpen((o) => (o === k ? null : k));
  const name = product.name[lang];

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ProductImage item={product} style={StyleSheet.absoluteFill} emojiSize={150} resizeMode="cover" />
          <View style={[styles.topBar, { top: insets.top + 8 }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.round} hitSlop={8}>
              <Ionicons name="chevron-back" size={22} color={colors.dark} />
            </Pressable>
            <Pressable style={styles.round} hitSlop={8} onPress={() => Share.share({ message: `${name} — ${formatPrice(product.price)} · Dastarkhan` })}>
              <Ionicons name="share-outline" size={20} color={colors.dark} />
            </Pressable>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.unit}>{unitText(product, t)}</Text>
            </View>
            <Pressable onPress={() => toggleFavorite(product.id)} hitSlop={10}>
              <Ionicons name={fav ? 'heart' : 'heart-outline'} size={28} color={fav ? colors.red : colors.gray} />
            </Pressable>
          </View>

          <View style={styles.qtyRow}>
            <Stepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} size="lg" />
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.price}>{formatPrice(product.price * qty)}</Text>
              {product.oldPrice ? <Text style={styles.old}>{formatPrice(product.oldPrice * qty)}</Text> : null}
            </View>
          </View>

          <View style={{ marginTop: 18 }}>
            <Row title={t('product.description')} open={open === 'detail'} onPress={() => toggle('detail')}>
              <Text style={styles.desc}>{t('catdesc.' + product.category)}</Text>
            </Row>
            <Row
              title={t('product.nutrition')}
              open={open === 'nutr'}
              onPress={() => toggle('nutr')}
              right={<View style={styles.badge}><Text style={styles.badgeText}>100 {t('unit.g')}</Text></View>}
            >
              <Text style={styles.desc}>{t('product.nutritionText')}</Text>
            </Row>
            <Row
              title={t('product.reviews')}
              open={open === 'review'}
              onPress={() => toggle('review')}
              right={
                <View style={{ flexDirection: 'row' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Ionicons key={i} name="star" size={16} color={i <= product.rating ? colors.accent : '#E0E4E1'} />
                  ))}
                </View>
              }
            >
              <Text style={styles.desc}>{t('product.reviewsText')}</Text>
            </Row>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
        <Button
          title={added ? t('product.added') : t('product.addToCart')}
          icon={added ? 'checkmark' : 'cart-outline'}
          onPress={() => {
            addToCart(product.id, qty);
            setAdded(true);
            setTimeout(() => navigation.goBack(), 450);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 340, backgroundColor: '#EFEFEF', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden' },
  topBar: { position: 'absolute', left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  round: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  name: { fontSize: 24, fontWeight: '800', color: colors.dark },
  unit: { fontSize: 16, color: colors.gray, marginTop: 6 },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 },
  price: { fontSize: 26, fontWeight: '800', color: colors.dark },
  old: { fontSize: 14, color: colors.gray, textDecorationLine: 'line-through' },
  accRow: { borderTopWidth: 1, borderTopColor: '#EBEFEC', paddingVertical: 14 },
  accHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accTitle: { fontSize: 16, fontWeight: '700', color: colors.dark },
  desc: { marginTop: 10, fontSize: 14, lineHeight: 21, color: colors.gray, fontWeight: '500' },
  badge: { backgroundColor: '#EBEFEC', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { fontSize: 11, color: colors.gray, fontWeight: '700' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 24, paddingTop: 12, backgroundColor: colors.white },
});
