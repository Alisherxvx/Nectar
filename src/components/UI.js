import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { colors, radius } from '../theme';
import { BackIcon, ChevronRightIcon, EyeIcon, CheckIcon } from './Icons';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

/** Мягкий пастельный фон с размытыми пятнами, как в макете. */
export function BlurBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={SCREEN_W} height={SCREEN_H}>
        <Defs>
          <RadialGradient id="g1" cx="85%" cy="5%" r="45%">
            <Stop offset="0" stopColor="#F8A44C" stopOpacity="0.22" />
            <Stop offset="1" stopColor="#F8A44C" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="g2" cx="10%" cy="0%" r="40%">
            <Stop offset="0" stopColor="#F7A593" stopOpacity="0.18" />
            <Stop offset="1" stopColor="#F7A593" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="g3" cx="10%" cy="95%" r="45%">
            <Stop offset="0" stopColor="#B7DFF5" stopOpacity="0.35" />
            <Stop offset="1" stopColor="#B7DFF5" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="g4" cx="90%" cy="95%" r="45%">
            <Stop offset="0" stopColor="#D3B0E0" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#D3B0E0" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="#FFFFFF" />
        <Rect width="100%" height="100%" fill="url(#g1)" />
        <Rect width="100%" height="100%" fill="url(#g2)" />
        <Rect width="100%" height="100%" fill="url(#g3)" />
        <Rect width="100%" height="100%" fill="url(#g4)" />
      </Svg>
    </View>
  );
}

export function PrimaryButton({ title, onPress, style, color = colors.primary, icon, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {icon ? <View style={styles.buttonIcon}>{icon}</View> : null}
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export function BackButton({ onPress }) {
  return (
    <Pressable onPress={onPress} hitSlop={16} style={styles.back}>
      <BackIcon />
    </Pressable>
  );
}

/** Круглая зелёная кнопка «далее» со стрелкой. */
export function NextButton({ onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.next, { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }]}
    >
      <ChevronRightIcon size={26} />
    </Pressable>
  );
}

/** Поле с подписью сверху и линией снизу (email, пароль, имя). */
export function UnderlineInput({ label, secure, valid, style, ...props }) {
  const [hidden, setHidden] = useState(true);
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#B1B1B1"
          secureTextEntry={secure ? hidden : false}
          autoCapitalize="none"
          {...props}
        />
        {secure ? (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={12}>
            <EyeIcon crossed={hidden} />
          </Pressable>
        ) : null}
        {valid ? <CheckIcon /> : null}
      </View>
    </View>
  );
}

export function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function Subtitle({ children, style }) {
  return <Text style={[styles.subtitle, style]}>{children}</Text>;
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const styles = StyleSheet.create({
  button: {
    height: 67,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    position: 'absolute',
    left: 34,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  back: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    marginLeft: -4,
  },
  next: {
    width: 67,
    height: 67,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
    paddingVertical: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 22,
  },
});
