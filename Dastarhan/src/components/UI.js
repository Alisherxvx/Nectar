import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadow } from '../theme';

export function Logo({ size = 64, light }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        backgroundColor: light ? colors.white : colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name="basket" size={size * 0.54} color={light ? colors.primary : colors.white} />
      <View style={{ position: 'absolute', top: size * 0.14, right: size * 0.16, width: size * 0.16, height: size * 0.16, borderRadius: size * 0.08, backgroundColor: colors.accent }} />
    </View>
  );
}

export function SoftBackground({ children, style }) {
  return (
    <LinearGradient colors={['#F1FAF5', '#FFFFFF', '#FFF8EC']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[{ flex: 1 }, style]}>
      {children}
    </LinearGradient>
  );
}

export function Header({ title, onBack, right, transparent }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }, transparent && { backgroundColor: 'transparent' }]}>
      <View style={styles.headSide}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.dark} />
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.headTitle} numberOfLines={1}>{title}</Text>
      <View style={[styles.headSide, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
}

export function Button({ title, onPress, variant = 'primary', icon, disabled, loading, style, right }) {
  const v = {
    primary: { bg: colors.primary, fg: colors.white, border: colors.primary },
    soft: { bg: colors.primarySoft, fg: colors.primary, border: colors.primarySoft },
    outline: { bg: colors.white, fg: colors.dark, border: colors.border },
    danger: { bg: colors.redSoft, fg: colors.red, border: colors.redSoft },
  }[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: v.bg, borderColor: v.border, opacity: disabled ? 0.5 : pressed ? 0.88 : 1 },
        variant === 'primary' && shadow,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={20} color={v.fg} style={{ marginRight: 8 }} /> : null}
          <Text style={[styles.buttonText, { color: v.fg }]}>{title}</Text>
          {right}
        </>
      )}
    </Pressable>
  );
}

export function Field({ label, error, style, inputStyle, left, right, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputBox, focused && { borderColor: colors.primary }, error && { borderColor: colors.red }]}>
        {left}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor="#A9B3AD"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {right}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export function Chip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipOn]}>
      <Text style={[styles.chipText, active && { color: colors.white }]}>{label}</Text>
    </Pressable>
  );
}

export function ListRow({ icon, title, subtitle, onPress, right, danger, last }) {
  const color = danger ? colors.red : colors.dark;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.listRow, !last && styles.listRowLine, pressed && { backgroundColor: colors.light }]}>
      <View style={[styles.listIcon, danger && { backgroundColor: colors.redSoft }]}>
        <Ionicons name={icon} size={20} color={danger ? colors.red : colors.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={[styles.listTitle, { color }]}>{title}</Text>
        {subtitle ? <Text style={styles.listSub} numberOfLines={1}>{subtitle}</Text> : null}
      </View>
      {right !== undefined ? right : onPress && !danger ? <Ionicons name="chevron-forward" size={18} color="#A9B3AD" /> : null}
    </Pressable>
  );
}

export function EmptyState({ icon, title, text, actionTitle, onAction }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Ionicons name={icon} size={42} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      {text ? <Text style={styles.emptyText}>{text}</Text> : null}
      {actionTitle ? <Button title={actionTitle} onPress={onAction} style={{ marginTop: 22, alignSelf: 'stretch' }} /> : null}
    </View>
  );
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 10, backgroundColor: colors.white },
  headSide: { width: 56 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.light, alignItems: 'center', justifyContent: 'center' },
  headTitle: { flex: 1, textAlign: 'center', fontSize: 19, fontWeight: '800', color: colors.dark },
  button: { height: 58, borderRadius: radius.button, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 20 },
  buttonText: { fontSize: 17, fontWeight: '700' },
  label: { fontSize: 14, fontWeight: '600', color: colors.gray, marginBottom: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', height: 54, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.white, paddingHorizontal: 14 },
  input: { flex: 1, fontSize: 16, color: colors.dark, paddingVertical: 0 },
  error: { color: colors.red, fontSize: 13, marginTop: 6 },
  chip: { paddingHorizontal: 16, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: 8, marginBottom: 8, backgroundColor: colors.white },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 14, fontWeight: '600', color: colors.dark },
  listRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  listRowLine: { borderBottomWidth: 1, borderBottomColor: '#EEF1EE' },
  listIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  listTitle: { fontSize: 16, fontWeight: '700' },
  listSub: { fontSize: 13, color: colors.gray, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36, paddingBottom: 80 },
  emptyIcon: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: colors.dark, marginTop: 20, textAlign: 'center' },
  emptyText: { fontSize: 14, color: colors.gray, marginTop: 8, textAlign: 'center', lineHeight: 20 },
});
