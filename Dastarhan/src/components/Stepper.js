import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function Stepper({ qty, onChange, size = 'md' }) {
  const big = size === 'lg';
  return (
    <View style={styles.row}>
      <Pressable onPress={() => onChange(qty - 1)} hitSlop={8} style={[styles.btn, big && styles.btnBig]}>
        <Ionicons name="remove" size={big ? 26 : 22} color={colors.gray} />
      </Pressable>
      <View style={[styles.qtyBox, big && styles.qtyBoxBig]}>
        <Text style={[styles.qty, big && { fontSize: 18 }]}>{qty}</Text>
      </View>
      <Pressable onPress={() => onChange(qty + 1)} hitSlop={8} style={[styles.btn, big && styles.btnBig]}>
        <Ionicons name="add" size={big ? 26 : 22} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  btnBig: { width: 44, height: 44 },
  qtyBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBoxBig: { width: 46, height: 46 },
  qty: { fontSize: 16, fontWeight: '600', color: colors.dark },
});
