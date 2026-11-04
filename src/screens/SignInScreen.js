import React from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { FlagBD } from '../components/Icons';
import { PrimaryButton, Title } from '../components/UI';
import { colors } from '../theme';

// Замените assets/images/groceries.png на картинку с продуктами из макета Figma.
const groceries = require('../../assets/images/groceries.png');
const { width } = Dimensions.get('window');

export default function SignInScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} bounces={false}>
      <Image source={groceries} style={styles.hero} resizeMode="cover" />
      <View style={styles.body}>
        <Title>Get your groceries{'\n'}with nectar</Title>

        <Pressable style={styles.phoneRow} onPress={() => navigation.navigate('Number')}>
          <FlagBD />
          <Text style={styles.phoneCode}>+880</Text>
        </Pressable>

        <Text style={styles.or}>Or connect with social media</Text>

        <PrimaryButton
          title="Continue with Google"
          color={colors.google}
          icon={<Text style={styles.socialIcon}>G</Text>}
          onPress={() => navigation.navigate('Login')}
        />
        <PrimaryButton
          title="Continue with Facebook"
          color={colors.facebook}
          icon={<Text style={styles.socialIcon}>f</Text>}
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    width,
    height: width * 0.95,
  },
  body: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  phoneCode: {
    fontSize: 18,
    color: colors.text,
    marginLeft: 12,
  },
  or: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 38,
  },
  socialIcon: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
});
