import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo, Button } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { LANGS } from '../i18n';
import { colors } from '../theme';

const background = require('../../assets/images/onboarding.png');

export default function OnboardingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t, lang, setLang, finishOnboarding } = useStore();

  return (
    <ImageBackground source={background} style={styles.bg} resizeMode="cover">
      <StatusBar style="light" />
      <LinearGradient colors={['rgba(0,0,0,0.05)', 'rgba(8,30,20,0.6)', 'rgba(8,30,20,0.92)']} locations={[0.25, 0.6, 1]} style={StyleSheet.absoluteFill} />

      <View style={[styles.langRow, { top: insets.top + 12 }]}>
        {LANGS.map((l) => (
          <Pressable key={l.id} onPress={() => setLang(l.id)} style={[styles.langBtn, lang === l.id && styles.langOn]}>
            <Text style={[styles.langText, lang === l.id && { color: colors.primaryDark }]}>{l.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom + 36 }]}>
        <Logo size={64} light />
        <Text style={styles.title}>{t('welcome.title')}</Text>
        <Text style={styles.subtitle}>{t('welcome.sub')}</Text>
        <Button
          title={t('welcome.start')}
          style={styles.button}
          onPress={() => {
            finishOnboarding();
            navigation.replace('SignIn');
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#1F2A22' },
  langRow: { position: 'absolute', right: 20, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 22, padding: 4 },
  langBtn: { paddingHorizontal: 14, height: 34, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  langOn: { backgroundColor: '#fff' },
  langText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  content: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 28 },
  title: { color: '#fff', fontSize: 34, fontWeight: '800', textAlign: 'center', lineHeight: 40, marginTop: 24 },
  subtitle: { color: 'rgba(255,255,255,0.78)', fontSize: 16, textAlign: 'center', marginTop: 12 },
  button: { alignSelf: 'stretch', marginTop: 32 },
});
