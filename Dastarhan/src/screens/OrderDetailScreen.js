import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Header, Button } from '../components/UI';
import ProductImage from '../components/ProductImage';
import { StatusPill } from './OrdersScreen';
import { getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice, formatDate, orderStatus } from '../utils/format';
import { colors, radius } from '../theme';

export default function OrderDetailScreen({ navigation, route }) {
  const { t, lang, orders, repeatOrder } = useStore();
  const o = orders.find((x) => x.id === route.params.id);
  if (!o) return null;
  const status = orderStatus(o);
  const steps = ['processing', 'delivering', 'delivered'];

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Header title={t('orders.no', { n: o.no })} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.date}>{formatDate(o.createdAt, lang)}</Text>
            <StatusPill status={status} t={t} />
          </View>
          <View style={styles.steps}>
            {steps.map((s, i) => {
              const done = steps.indexOf(status) >= i;
              return (
                <React.Fragment key={s}>
                  <View style={[styles.dot, done && styles.dotOn]} />
                  {i < steps.length - 1 ? <View style={[styles.line, steps.indexOf(status) > i && styles.dotOn]} /> : null}
                </React.Fragment>
              );
            })}
          </View>
          <View style={styles.rowBetween}>
            {steps.map((s) => <Text key={s} style={styles.stepLabel}>{t('status.' + s)}</Text>)}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>{t('orders.address')}</Text>
          <Text style={styles.value}>{o.addressText}</Text>
          <Text style={[styles.label, { marginTop: 14 }]}>{t('orders.payment')}</Text>
          <Text style={styles.value}>{o.paymentTitle}</Text>
        </View>

        <Text style={styles.section}>{t('orders.composition')}</Text>
        <View style={styles.card}>
          {o.items.map((i) => {
            const p = getProduct(i.id);
            if (!p) return null;
            return (
              <View key={i.id} style={styles.item}>
                <ProductImage item={p} style={{ width: 46, height: 46 }} rounded={12} emojiSize={24} />
                <Text style={styles.itemName} numberOfLines={1}>{p.name[lang]}</Text>
                <Text style={styles.itemQty}>×{i.qty}</Text>
                <Text style={styles.itemPrice}>{formatPrice(i.price * i.qty)}</Text>
              </View>
            );
          })}
          <View style={styles.divider} />
          <View style={styles.rowBetween}><Text style={styles.label}>{t('cart.subtotal')}</Text><Text style={styles.value}>{formatPrice(o.subtotal)}</Text></View>
          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text style={styles.label}>{t('cart.delivery')}</Text>
            <Text style={styles.value}>{o.deliveryFee === 0 ? t('cart.free') : formatPrice(o.deliveryFee)}</Text>
          </View>
          <View style={[styles.rowBetween, { marginTop: 12 }]}>
            <Text style={styles.totalLabel}>{t('cart.total')}</Text>
            <Text style={styles.totalVal}>{formatPrice(o.total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={t('orders.repeat')}
          icon="refresh"
          onPress={() => {
            repeatOrder(o);
            navigation.navigate('Tabs', { screen: 'Cart' });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: radius.lg, padding: 16, marginBottom: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 15, fontWeight: '700', color: colors.dark },
  steps: { flexDirection: 'row', alignItems: 'center', marginVertical: 16, paddingHorizontal: 6 },
  dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#DDE3DF' },
  dotOn: { backgroundColor: colors.primary },
  line: { flex: 1, height: 3, backgroundColor: '#DDE3DF', marginHorizontal: 4 },
  stepLabel: { fontSize: 11, color: colors.gray, fontWeight: '600' },
  label: { fontSize: 13, color: colors.gray, fontWeight: '600' },
  value: { fontSize: 15, color: colors.dark, fontWeight: '700', marginTop: 2 },
  section: { fontSize: 18, fontWeight: '800', color: colors.dark, marginTop: 8, marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  itemName: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '600', color: colors.dark },
  itemQty: { color: colors.gray, fontWeight: '600', marginHorizontal: 8 },
  itemPrice: { fontSize: 14, fontWeight: '700', color: colors.dark, minWidth: 70, textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#EEF1EE', marginVertical: 6 },
  totalLabel: { fontSize: 17, fontWeight: '800', color: colors.dark },
  totalVal: { fontSize: 20, fontWeight: '800', color: colors.primary },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEF1EE' },
});
