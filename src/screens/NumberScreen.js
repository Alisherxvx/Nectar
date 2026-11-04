import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlagBD } from '../components/Icons';
import { BlurBackground, BackButton, NextButton, Title } from '../components/UI';
import { colors } from '../theme';

export default function NumberScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.flex}>
      <BlurBackground />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <BackButton onPress={() => navigation.goBack()} />
          <Title style={styles.title}>Enter your mobile number</Title>

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputRow}>
            <FlagBD />
            <Text style={styles.code}>+880</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
              keyboardType="phone-pad"
              maxLength={10}
              autoFocus
            />
          </View>

          <View style={styles.footer}>
            <NextButton
              disabled={phone.length < 6}
              onPress={() => navigation.navigate('Verification', { phone: `+880${phone}` })}
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  code: {
    fontSize: 18,
    color: colors.text,
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
    marginLeft: 6,
    paddingVertical: 0,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
});
