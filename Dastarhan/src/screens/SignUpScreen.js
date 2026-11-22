import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { Logo, Header, Button, Field, SoftBackground, isEmail } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

export default function SignUpScreen({ navigation }) {
  const { t, signIn, addresses } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    if (!name.trim() || !isEmail(email) || password.length < 6) {
      Alert.alert(t('common.error'), t('signup.error'));
      return;
    }
    signIn({ name: name.trim(), email: email.trim() });
    if (addresses.length) navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
    else navigation.navigate('AddressEdit', { onboarding: true });
  };

  return (
    <SoftBackground>
      <Header title="" onBack={() => navigation.goBack()} transparent />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Logo size={60} />
          <Text style={styles.title}>{t('signup.title')}</Text>
          <Text style={styles.sub}>{t('signup.sub')}</Text>
          <Field label={t('signup.name')} value={name} onChangeText={setName} autoCapitalize="words" />
          <Field label={t('login.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="name@mail.kz" />
          <Field label={t('login.password')} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
          <Text style={styles.terms}>{t('signup.terms')}</Text>
          <Button title={t('signup.btn')} onPress={onSignUp} />
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>{t('signup.haveAccount')} </Text>
            <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
              <Text style={styles.link}>{t('login.btn')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SoftBackground>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 30 },
  title: { fontSize: 28, fontWeight: '800', color: colors.dark, marginTop: 24 },
  sub: { fontSize: 15, color: colors.gray, marginTop: 8, marginBottom: 28 },
  terms: { fontSize: 13, color: colors.gray, lineHeight: 19, marginVertical: 8, marginBottom: 22 },
  bottom: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  bottomText: { fontSize: 15, color: colors.gray, fontWeight: '500' },
  link: { fontSize: 15, fontWeight: '700', color: colors.primary },
});
