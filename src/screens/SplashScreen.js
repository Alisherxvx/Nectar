import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CarrotIcon } from '../components/Icons';
import { colors } from '../theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 2000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.logo}>
        <CarrotIcon size={52} color={colors.white} leafColor={colors.white} />
        <View style={styles.texts}>
          <Text style={styles.brand}>nectar</Text>
          <Text style={styles.tagline}>online groceries</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texts: {
    marginLeft: 12,
  },
  brand: {
    color: colors.white,
    fontSize: 56,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 60,
  },
  tagline: {
    color: colors.white,
    fontSize: 13,
    letterSpacing: 4.5,
    marginTop: -2,
    textAlign: 'center',
  },
});
