import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductImage from '../components/ProductImage';
import Stepper from '../components/Stepper';
import { Button, EmptyState } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { formatPrice, unitText } from '../utils/format';
import { FREE_DELIVERY_FROM } from '../config';
import { colors } from '../theme';

export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cartItems, subtotal, deliveryFee, total, setQty, removeFromCart, t, lang } = useStore();
  const left = Math.max(0, FREE_DELIVERY_FROM - subtotal);
  const progress = Math.min(1, subtotal / FREE_DELIVERY_FROM);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 12 }}>
      <Text style={styles.title}>{t('cart.title')}</Text>

      {cartItems.length === 0 ? (
        <EmptyState icon="cart-outline" title={t('cart.empty')} text={t('cart.emptyText')} actionTitle={t('cart.goShop')} onAction={() => navigation.navigate('Shop')} />
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(i) => i.product.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 230 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.promo}>
                <Text style={styles.promoText}>{left > 0 ? t('cart.freeFrom', { amount: formatPrice(left) }) : '🎉 ' + t('cart.freeReached')}</Text>
                <View style={styles.bar}>
                  <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
                </View>
              </View>
            }
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item: { product, qty } }) => (
              <View style={styles.item}>
                <ProductImage item={product} style={styles.img} rounded={16} emojiSize={36} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={styles.itemTop}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                      <Text style={styles.name}>{product.name[lang]}</Text>
                      <Text style={styles.unit}>{unitText(product, t)}</Text>
                    </View>
                    <Pressable onPress={() => removeFromCart(product.id)} hitSlop={10}>
                      <Ionicons name="close" size={22} color="#B3BBB6" />
                    </Pressable>
                  </View>
                  <View style={styles.itemBottom}>
                    <Stepper qty={qty} onChange={(q) => setQty(product.id, q)} />
                    <Text style={styles.price}>{formatPrice(product.price * qty)}</Text>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={[styles.footer, { paddingBottom: 14 }]}>
            <View style={styles.sumRow}>
              <Text style={styles.sumLabel}>{t('cart.subtotal')}</Text>
              <Text style={styles.sumVal}>{formatPrice(subtotal)}</Text>
            </View>
            <View style={styles.sumRow}>
              <Text style={styles.sumLabel}>{t('cart.delivery')}</Text>
              <Text style={[styles.sumVal, deliveryFee === 0 && { color: colors.primary }]}>{deliveryFee === 0 ? t('cart.free') : formatPrice(deliveryFee)}</Text>
            </View>
            <Button
              title={t('cart.checkout')}
              onPress={() => navigation.navigate('Checkout')}
              style={{ marginTop: 10 }}
              right={<Text style={styles.totalText}>{formatPrice(total)}</Text>}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.dark, textAlign: 'center' },
  promo: { backgroundColor: colors.accentSoft, borderRadius: 16, padding: 14, marginBottom: 6 },
  promoText: { fontSize: 14, fontWeight: '700', color: '#8A5200' },
  bar: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,159,28,0.25)', marginTop: 10, overflow: 'hidden' },
  barFill: { height: 8, borderRadius: 4, backgroundColor: colors.accent },
  sep: { height: 1, backgroundColor: '#EEF1EE' },
  item: { flexDirection: 'row', paddingVertical: 18 },
  img: { width: 78, height: 78 },
  itemTop: { flexDirection: 'row', alignItems: 'flex-start' },
  name: { fontSize: 16, fontWeight: '700', color: colors.dark },
  unit: { fontSize: 14, color: colors.gray, marginTop: 4 },
  itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  price: { fontSize: 18, fontWeight: '800', color: colors.dark },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 14, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: '#EEF1EE' },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  sumLabel: { fontSize: 15, color: colors.gray, fontWeight: '600' },
  sumVal: { fontSize: 15, fontWeight: '700', color: colors.dark },
  totalText: { position: 'absolute', right: 18, color: '#fff', fontSize: 15, fontWeight: '800' },
});
