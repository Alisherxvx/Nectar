import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

export default function OrderSuccessScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { t, orders } = useStore();
  const order = orders.find((o) => o.id === route.params?.id);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.center}>
        <View style={styles.circle}>
          <Ionicons name="checkmark" size={64} color="#fff" />
        </View>
        <Text style={styles.title}>{t('success.title')}</Text>
        {order ? <Text style={styles.no}>{t('orders.no', { n: order.no })}</Text> : null}
        <Text style={styles.text}>{t('success.text')}</Text>
      </View>
      <Button title={t('success.orders')} onPress={() => navigation.reset({ index: 1, routes: [{ name: 'Tabs' }, { name: 'Orders' }] })} />
      <Button variant="outline" title={t('success.shop')} style={{ marginTop: 12 }} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 124, height: 124, borderRadius: 62, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: colors.dark, marginTop: 28, textAlign: 'center' },
  no: { fontSize: 16, color: colors.primary, fontWeight: '700', marginTop: 8 },
  text: { fontSize: 15, color: colors.gray, textAlign: 'center', marginTop: 12, lineHeight: 22, paddingHorizontal: 12 },
});
