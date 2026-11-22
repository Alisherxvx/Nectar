import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Header, EmptyState } from '../components/UI';
import ProductImage from '../components/ProductImage';
import { getProduct } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice, formatDate, orderStatus } from '../utils/format';
import { colors, radius, shadow } from '../theme';

export const statusColors = {
  processing: { bg: colors.accentSoft, fg: '#B36B00' },
  delivering: { bg: '#E6F0FF', fg: '#2B62C9' },
  delivered: { bg: colors.primarySoft, fg: colors.primary },
};

export function StatusPill({ status, t }) {
  const c = statusColors[status];
  return (
    <View style={[styles.pill, { backgroundColor: c.bg }]}>
      <Text style={[styles.pillText, { color: c.fg }]}>{t('status.' + status)}</Text>
    </View>
  );
}

export default function OrdersScreen({ navigation }) {
  const { t, lang, orders } = useStore();

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Header title={t('orders.title')} onBack={() => navigation.goBack()} />
      {orders.length === 0 ? (
        <EmptyState icon="bag-handle-outline" title={t('orders.empty')} text={t('orders.emptyText')} actionTitle={t('cart.goShop')} onAction={() => navigation.navigate('Tabs', { screen: 'Shop' })} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          contentContainerStyle={{ padding: 20 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item: o }) => (
            <Pressable onPress={() => navigation.navigate('OrderDetail', { id: o.id })} style={styles.card}>
              <View style={styles.top}>
                <View>
                  <Text style={styles.no}>{t('orders.no', { n: o.no })}</Text>
                  <Text style={styles.date}>{formatDate(o.createdAt, lang)}</Text>
                </View>
                <StatusPill status={orderStatus(o)} t={t} />
              </View>
              <View style={styles.thumbs}>
                {o.items.slice(0, 5).map((i) => {
                  const p = getProduct(i.id);
                  return p ? <ProductImage key={i.id} item={p} style={styles.thumb} rounded={12} emojiSize={22} /> : null;
                })}
                {o.items.length > 5 ? <Text style={styles.more}>+{o.items.length - 5}</Text> : null}
              </View>
              <View style={styles.bottom}>
                <Text style={styles.count}>{t('orders.items', { n: o.items.reduce((n, i) => n + i.qty, 0) })}</Text>
                <Text style={styles.total}>{formatPrice(o.total)}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: radius.lg, padding: 16, ...shadow },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  no: { fontSize: 16, fontWeight: '800', color: colors.dark },
  date: { fontSize: 13, color: colors.gray, marginTop: 3 },
  pill: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  pillText: { fontSize: 12, fontWeight: '800' },
  thumbs: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  thumb: { width: 44, height: 44, marginRight: 8 },
  more: { color: colors.gray, fontWeight: '700', marginLeft: 4 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#EEF1EE' },
  count: { color: colors.gray, fontWeight: '600' },
  total: { fontSize: 17, fontWeight: '800', color: colors.dark },
});
