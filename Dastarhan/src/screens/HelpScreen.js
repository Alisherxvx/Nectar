import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, ListRow } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { FREE_DELIVERY_FROM, DELIVERY_FEE, SUPPORT } from '../config';
import { colors, radius } from '../theme';

export default function HelpScreen({ navigation }) {
  const { t } = useStore();
  const [open, setOpen] = useState(1);

  const openUrl = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert(t('common.error'), t('help.cantOpen'));
    }
  };

  const contacts = [
    { icon: 'call-outline', title: t('help.call'), sub: SUPPORT.phone, url: `tel:${SUPPORT.phone}` },
    { icon: 'logo-whatsapp', title: t('help.whatsapp'), url: `https://wa.me/${SUPPORT.whatsapp}` },
    { icon: 'paper-plane-outline', title: t('help.telegram'), url: `https://t.me/${SUPPORT.telegram}` },
    { icon: 'mail-outline', title: t('help.email'), sub: SUPPORT.email, url: `mailto:${SUPPORT.email}` },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Header title={t('help.title')} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.section}>{t('help.contact')}</Text>
        <Text style={styles.hours}>🕒 {t('help.hours')}</Text>
        <View style={styles.card}>
          {contacts.map((c, i) => (
            <ListRow key={c.icon} icon={c.icon} title={c.title} subtitle={c.sub} onPress={() => openUrl(c.url)} last={i === contacts.length - 1} />
          ))}
        </View>

        <Text style={[styles.section, { marginTop: 26 }]}>{t('help.faq')}</Text>
        <View style={styles.card}>
          {[1, 2, 3, 4, 5].map((n, i) => (
            <View key={n} style={[styles.faq, i < 4 && styles.line]}>
              <Pressable onPress={() => setOpen(open === n ? null : n)} style={styles.faqHead}>
                <Text style={styles.q}>{t(`faq.${n}.q`)}</Text>
                <Ionicons name={open === n ? 'chevron-up' : 'chevron-down'} size={18} color={colors.gray} />
              </Pressable>
              {open === n ? <Text style={styles.a}>{t(`faq.${n}.a`, { free: formatPrice(FREE_DELIVERY_FROM), fee: formatPrice(DELIVERY_FEE) })}</Text> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { fontSize: 19, fontWeight: '800', color: colors.dark, marginBottom: 6 },
  hours: { fontSize: 13, color: colors.gray, marginBottom: 12, fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: radius.lg, overflow: 'hidden' },
  faq: { padding: 16 },
  line: { borderBottomWidth: 1, borderBottomColor: '#EEF1EE' },
  faqHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  q: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.dark, paddingRight: 10 },
  a: { marginTop: 10, fontSize: 14, color: colors.gray, lineHeight: 21 },
});
