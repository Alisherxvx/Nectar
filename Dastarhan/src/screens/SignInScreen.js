import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from 'react-native';
import { Button, Field } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { LANGS } from '../i18n';
import { colors } from '../theme';

const groceries = require('../../assets/images/groceries.png');
const { width } = Dimensions.get('window');

// +7 (7XX) XXX-XX-XX форматы: тек 10 сан сақталады
const fmt = (d) => {
  const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6, 8), e = d.slice(8, 10);
  return [a, b, c, e].filter(Boolean).join(' ');
};

export default function SignInScreen({ navigation }) {
  const { t, lang, setLang, continueGuest, signIn } = useStore();
  const [digits, setDigits] = useState('');
  const [error, setError] = useState('');

  const next = () => {
    if (digits.length < 10) {
      setError(t('auth.badPhone'));
      return;
    }
    navigation.navigate('Verification', { phone: `+7 ${fmt(digits)}`, raw: `+7${digits}` });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.white }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView bounces={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 40 }}>
        <Image source={groceries} style={styles.hero} resizeMode="cover" />
        <View style={styles.langRow}>
          {LANGS.map((l) => (
            <Pressable key={l.id} onPress={() => setLang(l.id)} style={[styles.langBtn, lang === l.id && styles.langOn]}>
              <Text style={[styles.langText, lang === l.id && { color: '#fff' }]}>{l.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{t('auth.title')}</Text>
          <Field
            label={t('auth.phone')}
            style={{ marginTop: 26 }}
            value={fmt(digits)}
            onChangeText={(v) => {
              setError('');
              setDigits(v.replace(/\D/g, '').slice(0, 10));
            }}
            keyboardType="phone-pad"
            placeholder="700 123 45 67"
            error={error}
            left={<Text style={styles.code}>🇰🇿  +7</Text>}
          />
          <Button title={t('auth.getCode')} onPress={next} />

          <Pressable onPress={() => navigation.navigate('Login')} style={styles.link} hitSlop={8}>
            <Text style={styles.linkText}>{t('auth.orEmail')}</Text>
          </Pressable>
          <Button
            variant="outline"
            title={t('auth.guest')}
            onPress={() => {
              continueGuest();
              navigation.replace('Tabs');
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  hero: { width, height: width * 0.8 },
  langRow: { position: 'absolute', top: 50, right: 20, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 22, padding: 4 },
  langBtn: { paddingHorizontal: 12, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  langOn: { backgroundColor: colors.primary },
  langText: { fontWeight: '700', fontSize: 13, color: colors.dark },
  body: { paddingHorizontal: 24, marginTop: 22 },
  title: { fontSize: 28, fontWeight: '800', color: colors.dark, lineHeight: 34 },
  code: { fontSize: 16, color: colors.dark, fontWeight: '600', marginRight: 10 },
  link: { alignSelf: 'center', paddingVertical: 20 },
  linkText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
});
