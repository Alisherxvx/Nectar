import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductImage from '../components/ProductImage';
import { Header, Button } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { colors, radius } from '../theme';

function Block({ icon, title, value, sub, onPress, action }) {
  return (
    <Pressable onPress={onPress} style={styles.block}>
      <View style={styles.blockIcon}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={styles.blockTitle}>{title}</Text>
        <Text style={styles.blockValue} numberOfLines={2}>{value}</Text>
        {sub ? <Text style={styles.blockSub}>{sub}</Text> : null}
      </View>
      <Text style={styles.blockAction}>{action}</Text>
    </Pressable>
  );
}

export default function CheckoutScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t, lang, cartItems, subtotal, deliveryFee, total, currentAddress, currentPayment, addressText, placeOrder } = useStore();

  const submit = () => {
    if (!currentAddress) {
      Alert.alert(t('checkout.needAddress'));
      navigation.navigate('AddressEdit', {});
      return;
    }
    const order = placeOrder();
    if (order) navigation.reset({ index: 1, routes: [{ name: 'Tabs' }, { name: 'OrderSuccess', params: { id: order.id } }] });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Header title={t('checkout.title')} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
        <Block
          icon="location-outline"
          title={t('checkout.address')}
          value={currentAddress ? addressText(currentAddress) : t('home.noAddress')}
          sub={currentAddress?.comment}
          action={currentAddress ? t('common.change') : t('common.add')}
          onPress={() => navigation.navigate('Addresses', { select: true })}
        />
        <Block
          icon="wallet-outline"
          title={t('checkout.payment')}
          value={currentPayment.title}
          action={t('common.change')}
          onPress={() => navigation.navigate('Payments', { select: true })}
        />

        <Text style={styles.section}>{t('checkout.summary')}</Text>
        <View style={styles.card}>
          {cartItems.map(({ product, qty }) => (
            <View key={product.id} style={styles.line}>
              <ProductImage item={product} style={{ width: 44, height: 44 }} rounded={12} emojiSize={24} />
              <Text style={styles.lineName} numberOfLines={1}>{product.name[lang]}</Text>
              <Text style={styles.lineQty}>×{qty}</Text>
              <Text style={styles.linePrice}>{formatPrice(product.price * qty)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.sumRow}><Text style={styles.sumLabel}>{t('cart.subtotal')}</Text><Text style={styles.sumVal}>{formatPrice(subtotal)}</Text></View>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>{t('cart.delivery')}</Text>
            <Text style={[styles.sumVal, deliveryFee === 0 && { color: colors.primary }]}>{deliveryFee === 0 ? t('cart.free') : formatPrice(deliveryFee)}</Text>
          </View>
        </View>
        <Text style={styles.eta}>🕒 {t('checkout.eta')}</Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
        <Button
          title={t('checkout.place')}
          onPress={submit}
          right={<Text style={styles.total}>{formatPrice(total)}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.lg, padding: 16, marginBottom: 12 },
  blockIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  blockTitle: { fontSize: 12, color: colors.gray, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  blockValue: { fontSize: 16, fontWeight: '700', color: colors.dark, marginTop: 3 },
  blockSub: { fontSize: 13, color: colors.gray, marginTop: 2 },
  blockAction: { color: colors.primary, fontWeight: '700', fontSize: 14, marginLeft: 8 },
  section: { fontSize: 18, fontWeight: '800', color: colors.dark, marginTop: 10, marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: radius.lg, padding: 16 },
  line: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  lineName: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '600', color: colors.dark },
  lineQty: { color: colors.gray, fontWeight: '600', marginHorizontal: 8 },
  linePrice: { fontSize: 14, fontWeight: '700', color: colors.dark, minWidth: 70, textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#EEF1EE', marginVertical: 6 },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  sumLabel: { fontSize: 15, color: colors.gray, fontWeight: '600' },
  sumVal: { fontSize: 15, fontWeight: '700', color: colors.dark },
  eta: { textAlign: 'center', color: colors.gray, marginTop: 16, fontWeight: '600' },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingTop: 14, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEF1EE' },
  total: { position: 'absolute', right: 18, color: '#fff', fontWeight: '800', fontSize: 15 },
});
