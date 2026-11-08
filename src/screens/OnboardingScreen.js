import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CarrotIcon } from '../components/Icons';
import { PrimaryButton } from '../components/UI';
import { colors } from '../theme';

// Замените assets/images/onboarding.png на фото из макета Figma.
const background = require('../../assets/images/onboarding.png');

export default function OnboardingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground source={background} style={styles.bg} resizeMode="cover">
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.85)']}
        locations={[0.35, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.content, { paddingBottom: insets.bottom + 60 }]}>
        <CarrotIcon size={48} color={colors.white} leafColor={colors.white} />
        <Text style={styles.title}>Welcome{'\n'}to our store</Text>
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        <PrimaryButton
          title="Get Started"
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#1F2A22',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: colors.white,
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 52,
    marginTop: 30,
  },
  subtitle: {
    color: 'rgba(252,252,252,0.7)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 14,
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 40,
  },
});
