import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurBackground, BackButton, NextButton, Title } from '../components/UI';
import { colors } from '../theme';

export default function VerificationScreen({ navigation, route }) {
  const [code, setCode] = useState('');
  const phone = route.params?.phone;

  return (
    <View style={styles.flex}>
      <BlurBackground />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <BackButton onPress={() => navigation.goBack()} />
          <Title style={styles.title}>Enter your 4-digit code</Title>

          <Text style={styles.label}>Code</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={(t) => setCode(t.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              maxLength={4}
              placeholder="- - - -"
              placeholderTextColor={colors.text}
              autoFocus
            />
          </View>

          <View style={styles.footer}>
            <Pressable
              hitSlop={10}
              onPress={() => Alert.alert('Код отправлен', phone ? `Новый код отправлен на ${phone}` : 'Новый код отправлен')}
            >
              <Text style={styles.resend}>Resend Code</Text>
            </Pressable>
            <NextButton
              disabled={code.length < 4}
              onPress={() => navigation.navigate('SelectLocation')}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  title: {
    marginTop: 40,
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: 10,
  },
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  input: {
    fontSize: 18,
    color: colors.text,
    letterSpacing: 6,
    paddingVertical: 0,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  resend: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 22,
  },
});
