import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Alert, Pressable } from 'react-native';
import { Header, Button, Field, Chip } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

const CITIES = ['almaty', 'astana', 'shymkent', 'karaganda', 'aktobe', 'atyrau', 'oskemen', 'pavlodar'];
const LABELS = ['home', 'work', 'other'];

// route.params: { id } — өзгерту; { onboarding: true } — тіркелгеннен кейінгі бірінші мекенжай
export default function AddressEditScreen({ navigation, route }) {
  const { t, addresses, saveAddress } = useStore();
  const { id, onboarding } = route.params || {};
  const existing = addresses.find((a) => a.id === id);

  const [label, setLabel] = useState(existing?.label || 'home');
  const [city, setCity] = useState(existing?.city || 'almaty');
  const [street, setStreet] = useState(existing?.street || '');
  const [details, setDetails] = useState(existing?.details || '');
  const [comment, setComment] = useState(existing?.comment || '');

  const finish = () => {
    if (onboarding) navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
    else navigation.goBack();
  };

  const save = () => {
    if (!city || street.trim().length < 3) {
      Alert.alert(t('common.error'), t('addr.required'));
      return;
    }
    saveAddress({ id, label, city, street: street.trim(), details: details.trim(), comment: comment.trim() });
    finish();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        title={onboarding ? '' : existing ? t('addr.edit') : t('addr.new')}
        onBack={onboarding ? undefined : () => navigation.goBack()}
        right={onboarding ? <Pressable onPress={finish} hitSlop={10}><Text style={styles.skip}>{t('common.skip')}</Text></Pressable> : null}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          {onboarding ? (
            <View style={{ marginBottom: 22 }}>
              <Text style={styles.big}>{t('addr.locationTitle')}</Text>
              <Text style={styles.sub}>{t('addr.locationSub')}</Text>
            </View>
          ) : null}

          <Text style={styles.label}>{t('addr.label')}</Text>
          <View style={styles.wrap}>
            {LABELS.map((l) => <Chip key={l} label={t('addr.' + l)} active={label === l} onPress={() => setLabel(l)} />)}
          </View>

          <Text style={[styles.label, { marginTop: 8 }]}>{t('addr.city')}</Text>
          <View style={styles.wrap}>
            {CITIES.map((c) => <Chip key={c} label={t('city.' + c)} active={city === c} onPress={() => setCity(c)} />)}
          </View>

          <Field label={t('addr.street')} value={street} onChangeText={setStreet} autoCapitalize="words" placeholder="Абая 150" style={{ marginTop: 8 }} />
          <Field label={t('addr.details')} value={details} onChangeText={setDetails} placeholder="кв. 24, подъезд 2, этаж 5" />
          <Field label={t('addr.comment')} value={comment} onChangeText={setComment} multiline inputStyle={{ height: 60, textAlignVertical: 'top', paddingTop: 10 }} />

          <Button title={t('common.save')} onPress={save} style={{ marginTop: 8 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  big: { fontSize: 28, fontWeight: '800', color: colors.dark },
  sub: { fontSize: 15, color: colors.gray, marginTop: 8, lineHeight: 21 },
  label: { fontSize: 14, fontWeight: '600', color: colors.gray, marginBottom: 10 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  skip: { color: colors.primary, fontWeight: '700', fontSize: 15 },
});
