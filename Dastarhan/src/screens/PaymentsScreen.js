import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, Field } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { luhnValid, cardBrand } from '../utils/format';
import { colors, radius } from '../theme';

function Option({ item, selected, onPress, onDelete, t }) {
  return (
    <Pressable onPress={onPress} style={[styles.option, selected && styles.optionOn]}>
      <View style={[styles.icon, selected && { backgroundColor: colors.primary }]}>
        <Ionicons name={item.icon} size={20} color={selected ? '#fff' : colors.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={styles.title}>{item.title}</Text>
        {item.sub ? <Text style={styles.sub}>{item.sub}</Text> : null}
      </View>
      {item.isCard ? (
        <Pressable onPress={onDelete} hitSlop={10} style={{ marginRight: 10 }}>
          <Ionicons name="trash-outline" size={20} color={colors.red} />
        </Pressable>
      ) : null}
      <Ionicons name={selected ? 'radio-button-on' : 'radio-button-off'} size={24} color={selected ? colors.primary : '#B1B9B4'} />
    </Pressable>
  );
}

export default function PaymentsScreen({ navigation, route }) {
  const { t, paymentOptions, paymentId, selectPayment, addCard, deleteCard } = useStore();
  const selectMode = route.params?.select;
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState('');
  const [exp, setExp] = useState('');
  const [holder, setHolder] = useState('');

  const fmtNum = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const fmtExp = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };
  const expValid = (v) => {
    const m = /^(\d{2})\/(\d{2})$/.exec(v);
    if (!m) return false;
    const mm = +m[1], yy = +m[2];
    const now = new Date();
    return mm >= 1 && mm <= 12 && (yy > now.getFullYear() % 100 || (yy === now.getFullYear() % 100 && mm >= now.getMonth() + 1));
  };

  const save = () => {
    if (!luhnValid(num) || !expValid(exp) || holder.trim().length < 2) {
      Alert.alert(t('common.error'), t('pay.invalid'));
      return;
    }
    // Толық нөмір мен CVV сақталмайды — тек бренд пен соңғы 4 сан
    addCard({ brand: cardBrand(num), last4: num.replace(/\D/g, '').slice(-4), exp, holder: holder.trim().toUpperCase() });
    setOpen(false);
    setNum(''); setExp(''); setHolder('');
    if (selectMode) navigation.goBack();
  };

  const confirmDelete = (id) =>
    Alert.alert(t('pay.deleteConfirm'), '', [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => deleteCard(id) },
    ]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Header title={t('pay.title')} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {paymentOptions.map((o) => (
          <Option
            key={o.id}
            item={o}
            t={t}
            selected={paymentId === o.id}
            onPress={() => {
              selectPayment(o.id);
              if (selectMode) navigation.goBack();
            }}
            onDelete={() => confirmDelete(o.id)}
          />
        ))}
        <Button variant="soft" icon="add-circle-outline" title={t('pay.addCard')} onPress={() => setOpen(true)} style={{ marginTop: 8 }} />
        <Text style={styles.note}>🔒 {t('pay.secureNote')}</Text>
      </ScrollView>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView style={styles.backdrop} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>{t('pay.addCard')}</Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={10}><Ionicons name="close" size={24} color={colors.dark} /></Pressable>
            </View>
            <Field label={t('pay.cardNumber')} value={num} onChangeText={(v) => setNum(fmtNum(v))} keyboardType="number-pad" placeholder="0000 0000 0000 0000" />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Field style={{ flex: 1 }} label={t('pay.expiry')} value={exp} onChangeText={(v) => setExp(fmtExp(v))} keyboardType="number-pad" placeholder="MM/YY" />
              <Field style={{ flex: 1.4 }} label={t('pay.holder')} value={holder} onChangeText={setHolder} autoCapitalize="characters" placeholder="ALIYA NURLANOVA" />
            </View>
            <Button title={t('common.save')} onPress={save} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.lg, padding: 14, marginBottom: 12, borderWidth: 1.5, borderColor: 'transparent' },
  optionOn: { borderColor: colors.primary },
  icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: colors.dark },
  sub: { fontSize: 13, color: colors.gray, marginTop: 2 },
  note: { textAlign: 'center', color: colors.gray, fontSize: 13, lineHeight: 19, marginTop: 20, paddingHorizontal: 10 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 34 },
  sheetHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  sheetTitle: { fontSize: 20, fontWeight: '800', color: colors.dark },
});
