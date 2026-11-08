import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function PrimaryButton({ title, onPress, right, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && { backgroundColor: colors.primaryDark }, style]}>
      <Text style={styles.text}>{title}</Text>
      {right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 62,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
