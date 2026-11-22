import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListRow, Button } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { LANGS } from '../i18n';
import { colors, radius, shadow } from '../theme';

export default function AccountScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t, lang, setLang, user, guest, orders, currentAddress, addressText, currentPayment, signOut } = useStore();
  const name = user?.name || t('profile.guest');
  const contact = user?.phone || user?.email || '';

  const logout = () =>
    Alert.alert(t('profile.logout'), t('profile.logoutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('profile.logout'),
        style: 'destructive',
        onPress: () => {
          signOut();
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
        },
      },
    ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.light }} contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          {user?.name ? <Text style={styles.avatarText}>{user.name.trim()[0].toUpperCase()}</Text> : <Ionicons name="person" size={32} color={colors.primary} />}
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.name}>{name}</Text>
          {contact ? <Text style={styles.mail}>{contact}</Text> : <Text style={styles.mail}>{t('profile.guestHint')}</Text>}
        </View>
        {user ? (
          <Pressable onPress={() => navigation.navigate('EditProfile')} hitSlop={10} style={styles.editBtn}>
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </Pressable>
        ) : null}
      </View>

      {!user ? (
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Button title={t('profile.signIn')} onPress={() => navigation.navigate('SignIn')} />
        </View>
      ) : null}

      <View style={styles.group}>
        <ListRow icon="bag-handle-outline" title={t('profile.orders')} subtitle={orders.length ? t('orders.count', { n: orders.length }) : undefined} onPress={() => navigation.navigate('Orders')} />
        <ListRow icon="card-outline" title={t('profile.payments')} subtitle={currentPayment.title} onPress={() => navigation.navigate('Payments')} />
        <ListRow icon="location-outline" title={t('profile.addresses')} subtitle={currentAddress ? addressText(currentAddress) : undefined} onPress={() => navigation.navigate('Addresses')} />
        <ListRow icon="notifications-outline" title={t('profile.notifications')} onPress={() => navigation.navigate('Notifications')} />
        <ListRow icon="help-circle-outline" title={t('profile.help')} onPress={() => navigation.navigate('Help')} last />
      </View>

      <Text style={styles.groupTitle}>{t('profile.language')}</Text>
      <View style={styles.langBox}>
        {LANGS.map((l) => (
          <Pressable key={l.id} onPress={() => setLang(l.id)} style={[styles.langBtn, lang === l.id && styles.langOn]}>
            <Text style={[styles.langText, lang === l.id && { color: '#fff' }]}>{l.label}</Text>
          </Pressable>
        ))}
      </View>

      {user ? (
        <View style={[styles.group, { marginTop: 20 }]}>
          <ListRow icon="log-out-outline" title={t('profile.logout')} danger onPress={logout} last />
        </View>
      ) : null}
      <Text style={styles.version}>Dastarkhan · {t('profile.version', { v: '1.0.0' })}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 22 },
  avatar: { width: 68, height: 68, borderRadius: 34, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: colors.primary },
  name: { fontSize: 21, fontWeight: '800', color: colors.dark },
  mail: { fontSize: 14, color: colors.gray, marginTop: 4 },
  editBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  group: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: radius.lg, overflow: 'hidden', ...shadow },
  groupTitle: { fontSize: 14, fontWeight: '700', color: colors.gray, marginTop: 22, marginBottom: 10, marginHorizontal: 24, textTransform: 'uppercase', letterSpacing: 0.6 },
  langBox: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: '#fff', borderRadius: radius.lg, padding: 6 },
  langBtn: { flex: 1, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  langOn: { backgroundColor: colors.primary },
  langText: { fontSize: 16, fontWeight: '700', color: colors.dark },
  version: { textAlign: 'center', color: '#A9B3AD', fontSize: 12, marginTop: 24 },
});
