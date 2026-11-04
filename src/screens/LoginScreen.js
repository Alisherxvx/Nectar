import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CarrotIcon } from '../components/Icons';
import { BlurBackground, PrimaryButton, UnderlineInput, Title, Subtitle, isEmail } from '../components/UI';
import { colors } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!isEmail(email) || password.length < 6) {
      Alert.alert('Ошибка', 'Введите корректный email и пароль (не меньше 6 символов)');
      return;
    }
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <View style={styles.flex}>
      <BlurBackground />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.logo}>
              <CarrotIcon size={46} />
            </View>

            <Title>Login</Title>
            <Subtitle style={styles.subtitle}>Enter your emails and password</Subtitle>

            <UnderlineInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="imshuvo97@gmail.com"
            />
            <UnderlineInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secure
              style={{ marginBottom: 20 }}
            />

            <Pressable style={styles.forgot} hitSlop={8} onPress={() => Alert.alert('Восстановление пароля', 'Ссылка для сброса отправлена на почту')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>

            <PrimaryButton title="Log In" onPress={onLogin} />

            <View style={styles.bottom}>
              <Text style={styles.bottomText}>Don't have an account? </Text>
              <Pressable onPress={() => navigation.navigate('SignUp')} hitSlop={8}>
                <Text style={styles.link}>Signup</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  logo: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 90,
  },
  subtitle: {
    marginTop: 14,
    marginBottom: 40,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    fontSize: 14,
    color: colors.text,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  bottomText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
