import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';
import { Header, Button, Field, SoftBackground } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

// ДЕМО: нақты SMS жіберу үшін сервер/SMS-провайдер (мысалы Firebase Auth, Twilio, Mobizon) қосу керек.
export default function VerificationScreen({ navigation, route }) {
  const { t, signIn, addresses } = useStore();
  const [code, setCode] = useState('');
  const { phone, raw } = route.params;

  const submit = () => {
    signIn({ phone: raw, name: '' });
    if (addresses.length) navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
    else navigation.navigate('AddressEdit', { onboarding: true });
  };

  return (
    <SoftBackground>
      <Header title="" onBack={() => navigation.goBack()} transparent />
      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>{t('code.title')}</Text>
        <Text style={styles.sub}>{t('code.sent', { phone })}</Text>
        <Field
          label={t('code.label')}
          style={{ marginTop: 28 }}
          inputStyle={{ fontSize: 24, letterSpacing: 10, fontWeight: '700' }}
          value={code}
          onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, 4))}
          keyboardType="number-pad"
          placeholder="····"
          autoFocus
        />
        <Text style={styles.demo}>{t('code.demo')}</Text>
        <Pressable onPress={() => Alert.alert(t('code.resent'), phone)} hitSlop={10} style={{ marginVertical: 18 }}>
          <Text style={styles.resend}>{t('code.resend')}</Text>
        </Pressable>
        <Button title={t('common.continue')} disabled={code.length < 4} onPress={submit} />
      </KeyboardAvoidingView>
    </SoftBackground>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '800', color: colors.dark },
  sub: { fontSize: 15, color: colors.gray, marginTop: 10 },
  demo: { fontSize: 13, color: colors.accent, fontWeight: '600' },
  resend: { color: colors.primary, fontSize: 16, fontWeight: '700' },
});
