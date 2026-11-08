import React from 'react';
import { formatPrice } from '../utils/format';
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductImage from '../components/ProductImage';
import Stepper from '../components/Stepper';
import PrimaryButton from '../components/PrimaryButton';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cartItems, cartTotal, setQty, removeFromCart, clearCart } = useStore();

  const checkout = () => {
    Alert.alert('Заказ оформлен', `Сумма заказа: ${formatPrice(cartTotal)}. Спасибо за покупку!`, [
      { text: 'OK', onPress: clearCart },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 12 }}>
      <Text style={styles.title}>Корзина</Text>
      <View style={styles.line} />

      {cartItems.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cart-outline" size={44} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Корзина пуста</Text>
          <Text style={styles.emptyText}>Добавьте товары, чтобы оформить заказ.</Text>
          <Pressable onPress={() => navigation.navigate('Shop')} style={styles.emptyBtn}>
            <Text style={styles.emptyBtnText}>Перейти в магазин</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(i) => i.product.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item: { product, qty } }) => (
              <View style={styles.item}>
                <ProductImage uri={product.image} style={styles.img} rounded={16} />
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <View style={styles.itemTop}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                      <Text style={styles.name}>{product.name}</Text>
                      <Text style={styles.unit}>{product.unit}</Text>
                    </View>
                    <Pressable onPress={() => removeFromCart(product.id)} hitSlop={10}>
                      <Ionicons name="close" size={22} color="#B3B3B3" />
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
          <View style={styles.footer}>
            <PrimaryButton
              title="Оформить заказ"
              onPress={checkout}
              right={
                <View style={styles.totalPill}>
                  <Text style={styles.totalText}>{formatPrice(cartTotal)}</Text>
                </View>
              }
              style={{ justifyContent: 'center' }}
            />
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
  item: { flexDirection: 'row', paddingVertical: 20 },
  img: { width: 78, height: 78 },
  itemTop: { flexDirection: 'row', alignItems: 'flex-start' },
  name: { fontSize: 16, fontWeight: '700', color: colors.dark },
  unit: { fontSize: 14, color: colors.gray, marginTop: 4 },
  itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  price: { fontSize: 18, fontWeight: '700', color: colors.dark },
  footer: { position: 'absolute', left: 20, right: 20, bottom: 16 },
  totalPill: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#489E67',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  totalText: { color: '#fff', fontSize: 12, fontWeight: '700' },
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
  emptyBtn: { marginTop: 22, backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16 },
  emptyBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
