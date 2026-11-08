import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

const items = [
  { icon: 'bag-handle-outline', label: 'Заказы' },
  { icon: 'card-outline', label: 'Способы оплаты' },
  { icon: 'location-outline', label: 'Адрес доставки' },
  { icon: 'notifications-outline', label: 'Уведомления' },
  { icon: 'help-circle-outline', label: 'Помощь' },
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: insets.top + 12 }}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={30} color={colors.primary} />
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.name}>Пользователь Nectar</Text>
          <Text style={styles.mail}>user@nectar.app</Text>
        </View>
      </View>
      <View style={styles.line} />
      {items.map((i) => (
        <Pressable key={i.label} style={styles.row}>
          <Ionicons name={i.icon} size={22} color={colors.dark} />
          <Text style={styles.label}>{i.label}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.dark} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 20, fontWeight: '700', color: colors.dark },
  mail: { fontSize: 14, color: colors.gray, marginTop: 4 },
  line: { height: 1, backgroundColor: '#E2E2E2' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  label: { flex: 1, marginLeft: 16, fontSize: 16, fontWeight: '600', color: colors.dark },
});
