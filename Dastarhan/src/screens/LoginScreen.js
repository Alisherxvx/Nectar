import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { Logo, Header, Button, Field, SoftBackground, isEmail } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

// ДЕМО: нақты тексеру үшін серверді (backend) қосу керек.
export default function LoginScreen({ navigation }) {
  const { t, signIn, addresses } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(true);

  const onLogin = () => {
    if (!isEmail(email) || password.length < 6) {
      Alert.alert(t('common.error'), t('login.error'));
      return;
    }
    signIn({ email: email.trim() });
    if (addresses.length) navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
    else navigation.navigate('AddressEdit', { onboarding: true });
  };

  return (
    <SoftBackground>
      <Header title="" onBack={() => navigation.goBack()} transparent />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Logo size={60} />
          <Text style={styles.title}>{t('login.title')}</Text>
          <Text style={styles.sub}>{t('login.sub')}</Text>
          <Field label={t('login.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="name@mail.kz" />
          <Field
            label={t('login.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidden}
            autoCapitalize="none"
            right={
              <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
                <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={22} color={colors.gray} />
              </Pressable>
            }
          />
          <Pressable style={styles.forgot} hitSlop={8} onPress={() => Alert.alert(t('login.forgot'), t('login.resetSent'))}>
            <Text style={styles.small}>{t('login.forgot')}</Text>
          </Pressable>
          <Button title={t('login.btn')} onPress={onLogin} />
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>{t('login.noAccount')} </Text>
            <Pressable onPress={() => navigation.navigate('SignUp')} hitSlop={8}>
              <Text style={styles.link}>{t('login.signup')}</Text>
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
  small: { fontSize: 14, color: colors.gray, fontWeight: '600' },
  forgot: { alignSelf: 'flex-end', marginBottom: 22 },
  bottom: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  bottomText: { fontSize: 15, color: colors.gray, fontWeight: '500' },
  link: { fontSize: 15, fontWeight: '700', color: colors.primary },
});
