import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CarrotIcon } from '../components/Icons';
import { BlurBackground, PrimaryButton, UnderlineInput, Title, Subtitle, isEmail } from '../components/UI';
import { colors } from '../theme';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    if (!username.trim() || !isEmail(email) || password.length < 6) {
      Alert.alert('Ошибка', 'Заполните имя, корректный email и пароль (не меньше 6 символов)');
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

            <Title>Sign Up</Title>
            <Subtitle style={styles.subtitle}>Enter your credentials to continue</Subtitle>

            <UnderlineInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="words"
              placeholder="Afsar Hossen Shuvo"
            />
            <UnderlineInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="imshuvo97@gmail.com"
              valid={isEmail(email)}
            />
            <UnderlineInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secure
              style={{ marginBottom: 20 }}
            />

            <Text style={styles.terms}>
              By continuing you agree to our <Text style={styles.link}>Terms of Service</Text>
              {'\n'}and <Text style={styles.link}>Privacy Policy.</Text>
            </Text>

            <PrimaryButton title="Sign Up" onPress={onSignUp} />

            <View style={styles.bottom}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
                <Text style={styles.linkBold}>Log In</Text>
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
  terms: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 21,
    marginBottom: 30,
  },
  link: {
    color: colors.primary,
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
  linkBold: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
