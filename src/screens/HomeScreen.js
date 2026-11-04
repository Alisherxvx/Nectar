import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CarrotIcon } from '../components/Icons';
import { PrimaryButton } from '../components/UI';
import { colors } from '../theme';

// Временная главная страница: сюда дальше пойдут экраны магазина из макета.
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <CarrotIcon size={46} />
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.text}>Вы вошли в Nectar. Экраны магазина будут здесь.</Text>
      <PrimaryButton
        title="Log Out"
        style={styles.button}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.text,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 40,
  },
});
