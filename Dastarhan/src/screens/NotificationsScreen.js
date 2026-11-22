import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Header } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors, radius } from '../theme';

// ЕСКЕРТУ: бұл — баптаулар сақталатын экран. Нақты push-хабарламалар үшін expo-notifications + сервер қосу керек.
export default function NotificationsScreen({ navigation }) {
  const { t, notif, setNotif } = useStore();
  const items = [
    { k: 'orders', title: t('notif.orders'), sub: t('notif.ordersSub') },
    { k: 'promo', title: t('notif.promo'), sub: t('notif.promoSub') },
    { k: 'news', title: t('notif.news'), sub: t('notif.newsSub') },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Header title={t('notif.title')} onBack={() => navigation.goBack()} />
      <View style={styles.card}>
        {items.map((i, idx) => (
          <View key={i.k} style={[styles.row, idx < items.length - 1 && styles.line]}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.title}>{i.title}</Text>
              <Text style={styles.sub}>{i.sub}</Text>
            </View>
            <Switch value={!!notif[i.k]} onValueChange={(v) => setNotif(i.k, v)} trackColor={{ true: colors.primary, false: '#D5DBD7' }} thumbColor="#fff" />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', margin: 20, borderRadius: radius.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  line: { borderBottomWidth: 1, borderBottomColor: '#EEF1EE' },
  title: { fontSize: 16, fontWeight: '700', color: colors.dark },
  sub: { fontSize: 13, color: colors.gray, marginTop: 3 },
});
