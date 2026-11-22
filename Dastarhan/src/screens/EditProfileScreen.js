import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Header, Button, Field, isEmail } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

export default function EditProfileScreen({ navigation }) {
  const { t, user, updateUser } = useStore();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  const save = () => {
    if (email && !isEmail(email)) {
      Alert.alert(t('common.error'), t('editProfile.badEmail'));
      return;
    }
    updateUser({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    Alert.alert(t('editProfile.saved'));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header title={t('editProfile.title')} onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
          <Field label={t('editProfile.name')} value={name} onChangeText={setName} autoCapitalize="words" />
          <Field label={t('editProfile.phone')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+7 700 123 45 67" />
          <Field label={t('editProfile.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Button title={t('common.save')} onPress={save} style={{ marginTop: 8 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
