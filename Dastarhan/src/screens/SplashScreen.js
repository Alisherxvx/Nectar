import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Logo } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { colors } from '../theme';

export default function SplashScreen({ navigation }) {
  const { ready, onboarded, user, guest } = useStore();

  useEffect(() => {
    if (!ready) return undefined;
    const timer = setTimeout(() => {
      navigation.replace(!onboarded ? 'Onboarding' : user || guest ? 'Tabs' : 'SignIn');
    }, 1400);
    return () => clearTimeout(timer);
  }, [ready, onboarded, user, guest, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Logo size={92} light />
      <Text style={styles.brand}>Dastarkhan</Text>
      <Text style={styles.tagline}>FRESH · FAST · QAZAQSTAN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  brand: { color: '#fff', fontSize: 40, fontWeight: '800', marginTop: 22, letterSpacing: 0.5 },
  tagline: { color: 'rgba(255,255,255,0.75)', fontSize: 12, letterSpacing: 4, marginTop: 8, fontWeight: '600' },
});
